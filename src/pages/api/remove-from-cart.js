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
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const db = await openDb();
    await db.run('DELETE FROM carrito WHERE idUser = ? AND idProducto = ?', [decoded.id, productId]);

    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
}
