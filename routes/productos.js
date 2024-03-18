var express = require("express");
var router = express.Router();

const productosController = require("../controllers/productsController");

// Retornar todos los productos destacados
router.get("/", productosController.getDestacados);

// Retornar un producto por ID, detalle de producto
router.get("/:id", productosController.getById);

// Crear un producto (requiere autenticación)
router.post("/", verifyToken, productosController.create);

// Actualizar un producto (requiere autenticación)
router.put("/:id", verifyToken, productosController.update);

// Eliminar un producto (requiere autenticación)
router.delete("/:id", verifyToken, productosController.remove);

// Middleware para verificar el token
function verifyToken(req, res, next) {
  // Implementa la verificación del token aquí
  // Por ejemplo:
  // const token = req.headers.authorization;
  // Si el token es válido, llama a next()
  // De lo contrario, envía una respuesta de error
  
  // Por ahora, simplemente pasamos al siguiente middleware
  next();
}

module.exports = router;
