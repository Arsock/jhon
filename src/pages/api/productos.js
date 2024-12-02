import { openDb } from '../../app/db';

export default async function handler(req, res) {
  const db = await openDb();
  const products = await db.all('SELECT * FROM productos');
  res.status(200).json(products);
}
