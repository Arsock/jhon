import { openDb } from '../../app/db';

export default async function handler(req, res) {
  try {
    const { orderId, newStatus } = req.body;

    if (!orderId || !newStatus) {
      return res.status(400).json({ error: 'Order ID and new status are required' });
    }

    const db = await openDb();
    await db.run('UPDATE orden SET estado = ? WHERE id = ?', [newStatus, orderId]);

    res.status(200).json({ message: 'Estado actualizado' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
}
