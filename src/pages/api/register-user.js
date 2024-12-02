import { setupDb } from "../../app/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, apellido, telefono, email, ciudad, direccion, clave, rol = 'user' } = req.body;
    try {
      const db = await setupDb();
      await db.run(
        `INSERT INTO users (nombre, apellido, telefono, email, ciudad, direccion, rol, clave) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, telefono, email, ciudad, direccion, rol, clave]
      );
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
