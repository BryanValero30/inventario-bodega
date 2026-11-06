const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Almacenamiento en memoria (límite declarado: se pierde al reiniciar)
let productos = [];
let nextId = 1;

// POST /productos — registrar producto
app.post('/productos', (req, res) => {
  const { nombre, cantidad } = req.body || {};

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  if (cantidad === undefined || typeof cantidad !== 'number' || cantidad < 0) {
    return res.status(400).json({ error: 'La cantidad debe ser un número no negativo' });
  }

  const producto = { id: nextId++, nombre: nombre.trim(), cantidad };
  productos.push(producto);
  res.status(201).json(producto);
});

// GET /productos — listar productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// GET /productos/:id — consultar por identificador
app.get('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

// Manejo de JSON inválido
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  res.status(500).json({ error: 'Error interno' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API de inventario escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;