import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './src/app/data.db',
    driver: sqlite3.Database
  });
}

export async function setupDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      cantidad INTEGER,
      categoria TEXT,
      tallas TEXT,
      imagen TEXT,
      precio REAL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      apellido TEXT,
      telefono TEXT,
      email TEXT,
      ciudad TEXT,
      direccion TEXT,
      rol TEXT,
      clave TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS carrito (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idUser TEXT,
      idProducto TEXT,
      nombreProducto TEXT,
      imagen TEXT,
      cantidad TEXT,
      talla TEXT,
      FOREIGN KEY (idUser) REFERENCES users(id),
      FOREIGN KEY (idProducto) REFERENCES productos(id)
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS orden (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombreUser TEXT,
      productos TEXT,
      fecha TEXT,
      estado TEXT,
      metodoPago TEXT,
      entrega TEXT,
      total REAL
    );
  `);

  const productosIniciales = [
    {
      imagen: 'Franela_black_diseño_bateria_baja_en_dtf.jpg',
      nombre: 'Franela black diseño bateria baja en dtf',
      tallas: 'S, M, L, XL',
      cantidad: 10,
      precio: 20
    },
    {
      imagen: 'Franela_diseño_dragon_en_sublimacion.jpg',
      nombre: 'Franela diseño dragon en sublimacion',
      tallas: 'S, M, L, XL',
      cantidad: 10,
      precio: 18
    },
    {
      imagen: 'Franela_diseño_rosa_en_sublimación.jpg',
      nombre: 'Franela diseño rosa en sublimación',
      tallas: 'S, M, L, XL',
      cantidad: 10,
      precio: 15
    },
    {
      imagen: 'Mono_blanco_diseño_dragon_en_sublimacion.jpg',
      nombre: 'Mono blanco diseño dragon en sublimacion',
      tallas: 'S, M, L, XL',
      cantidad: 10,
      precio: 25
    },
    {
      imagen: 'Mono_diseño_astetic_bi_color_en_dtf.jpg',
      nombre: 'Mono diseño astetic bi color en dtf',
      tallas: 'S, M, L, XL',
      cantidad: 10,
      precio: 10
    },
    {
      imagen: 'Mono_negro_dragon_diseño_en_dtf.jpg',
      nombre: 'Mono negro dragon diseño en dtf',
      tallas: 'S, M, L, XL',
      cantidad: 10,
      precio: 15
    }
  ];

  for (const producto of productosIniciales) {
    const existingProduct = await db.get(`
      SELECT id FROM productos WHERE nombre = ?
    `, [producto.nombre]);

    if (!existingProduct) {
      await db.run(`
        INSERT INTO productos (nombre, cantidad, categoria, tallas, imagen, precio)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [producto.nombre, producto.cantidad, 'General', producto.tallas, producto.imagen, producto.precio]);
    }
  }

  return db;
}
