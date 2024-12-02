import { setupDb } from '../../app/db';

export default async function handler(req, res) {
  try {
    await setupDb();
    res.status(200).json({ message: 'Base de datos configurada correctamente' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
