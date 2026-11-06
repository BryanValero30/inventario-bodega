# Inventario bodega — API local (LB-01)

API de demostración para registrar y consultar productos en memoria.

## Alcance (LB-01)

- POST /productos — registrar producto
- GET /productos — listar productos
- GET /productos/:id — consultar por identificador
- Validación básica de entrada (400)

Excluido: cobros, autenticación, ventas, reportes, base de datos persistente, pantallas.

## Límite de memoria

Los datos se guardan en memoria y se pierden al reiniciar el proceso. Es un límite declarado, no un error.

## Ejecución local

```bash
npm install
npm start
# API en http://localhost:8080