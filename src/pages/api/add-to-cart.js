import { openDb } from '../../app/db';
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

    const { productId, quantity, size } = req.body;

    if (!productId || !quantity || !size) {
      return res.status(400).json({ error: 'Product ID, quantity, and size are required' });
    }

    const db = await openDb();

    const product = await db.get('SELECT nombre, imagen FROM productos WHERE id = ?', [productId]);

    await db.run(
      'INSERT INTO carrito (idUser, idProducto, nombreProducto, imagen, cantidad, talla) VALUES (?, ?, ?, ?, ?, ?)',
      [decoded.id, productId, product.nombre, product.imagen, quantity, size]
    );

    res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
