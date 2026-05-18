require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// CONEXIÓN MYSQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// OBTENER PRODUCTOS
app.get('/productos', (req, res) => {

  db.query(
    'SELECT * FROM productos',
    (err, results) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

// AGREGAR PRODUCTOS
app.post('/productos', (req, res) => {

  const { nombre, precio, stock } = req.body;

  // VALIDACIONES
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      error: 'El nombre es obligatorio'
    });
  }

  if (precio < 0) {
    return res.status(400).json({
      error: 'El precio no puede ser negativo'
    });
  }

  if (stock < 0) {
    return res.status(400).json({
      error: 'El stock no puede ser negativo'
    });
  }

  db.query(
    'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
    [nombre, precio, stock],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: result.insertId,
        nombre,
        precio,
        stock
      });
    }
  );
});

// ELIMINAR PRODUCTO
app.delete('/productos/:id', (req, res) => {

  const { id } = req.params;

  db.query(
    'DELETE FROM productos WHERE id = ?',
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: 'Producto eliminado'
      });
    }
  );
});

// SERVIDOR
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});