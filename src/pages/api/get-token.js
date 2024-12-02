import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '123'; // Usa la misma clave secreta utilizada para firmar el token

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(400).json({ error: 'No hay token en las cookies' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ decoded });
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
