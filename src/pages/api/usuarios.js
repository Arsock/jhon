import { openDb } from '../../app/db';

export default async function handler(req, res) {
  try {
    const db = await openDb();
    const usuarios = await db.all('SELECT * FROM users');
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
}
