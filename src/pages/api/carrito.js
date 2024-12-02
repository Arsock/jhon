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
    const userId = decoded.id;

    const db = await openDb();
    const carrito = await db.all('SELECT * FROM carrito WHERE idUser = ?', [userId]);
    const productosConPrecio = await Promise.all(carrito.map(async (item) => {
      const producto = await db.get('SELECT precio FROM productos WHERE id = ?', [item.idProducto]);
      return { ...item, precio: producto.precio };
    }));
    res.status(200).json(productosConPrecio);
  } catch (error) {
    console.error('Error fetching carrito:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
}
