import { openDb } from '../../app/db';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '123'; // Usa la misma clave secreta utilizada para firmar el token

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Inicie sesión para continuar.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { metodoPago, entrega, productos, total } = req.body;

    const db = await openDb();
    const productosString = JSON.stringify(productos);
    const fecha = new Date().toISOString();

    // Inserta el pedido en la tabla `orden`
    await db.run(`
      INSERT INTO orden (nombreUser, productos, fecha, estado, metodoPago, entrega, total)
      VALUES (?, ?, ?, 'en espera', ?, ?, ?)
    `, [decoded.email, productosString, fecha, metodoPago, entrega, total]);

    // Elimina los artículos del carrito del usuario
    await db.run('DELETE FROM carrito WHERE idUser = ?', [decoded.id]);

    res.status(200).json({ message: 'Compra Finalizada' });
  } catch (error) {
    console.error('Error finalizing purchase:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
}
