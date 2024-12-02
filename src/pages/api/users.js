import { setupDb } from "../../app/db";

export default async function handler(req, res) {
  try {
    console.log("xd");
    const db = await setupDb();
    const users = await db.all('SELECT * FROM users'); // Ajusta según tu tabla
    res.status(200).json(users);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
