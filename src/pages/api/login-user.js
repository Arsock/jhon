import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { setupDb } from '@/app/db';

const SECRET_KEY = '123';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, clave } = req.body;
    try {
      const db = await setupDb();
      const user = await db.get(`SELECT * FROM users WHERE email = ? AND clave = ?`, [email, clave]);
      
      if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 3600,
          sameSite: 'strict',
          path: '/'
        }));
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
