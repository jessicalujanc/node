const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");

// Ruta para obtener todas las categorías
router.get("/", categoriasController.getAll);

// Ruta para crear una nueva categoría
router.post("/", categoriasController.create);

module.exports = router;
