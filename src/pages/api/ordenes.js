import { openDb } from '../../app/db';

export default async function handler(req, res) {
  try {
    const db = await openDb();
    const ordenes = await db.all(`
      SELECT orden.id, orden.nombreUser, orden.productos, orden.fecha, orden.estado, orden.metodoPago, orden.entrega, orden.total, 
             users.nombre, users.apellido, users.telefono, users.direccion 
      FROM orden 
      JOIN users ON orden.nombreUser = users.email
    `);

    res.status(200).json(ordenes);
  } catch (error) {
    console.error('Error fetching ordenes:', error);
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
}
