const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'inventory123',
  database: process.env.DB_NAME || 'inventory_db'
};

// Conexión a la base de datos
let connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado a MySQL');
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
    process.exit(1);
  }
}

// Rutas API
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, description, quantity, price, category } = req.body;
    const [result] = await connection.execute(
      'INSERT INTO products (name, description, quantity, price, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, quantity, price, category]
    );
    const [newProduct] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [result.insertId]
    );
    res.status(201).json(newProduct[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, description, quantity, price, category } = req.body;
    await connection.execute(
      'UPDATE products SET name=?, description=?, quantity=?, price=?, category=? WHERE id=?',
      [name, description, quantity, price, category, req.params.id]
    );
    const [updatedProduct] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    res.json(updatedProduct[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await connection.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Low stock alert
app.get('/api/low-stock', async (req, res) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM products WHERE quantity <= 5 ORDER BY quantity ASC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicializar conexión y servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en puerto ${PORT}`);
  });
});