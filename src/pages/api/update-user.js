import { openDb } from '../../app/db';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, nombre, apellido, email, telefono, direccion, rol } = req.body;
    try {
      const db = await openDb();
      await db.run('UPDATE users SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, rol = ? WHERE id = ?', [nombre, apellido, email, telefono, direccion, rol, id]);
      const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', [id]);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
