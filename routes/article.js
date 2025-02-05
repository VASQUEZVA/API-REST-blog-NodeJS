
const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/articles");

// Ruta de prueba
router.get("/ruta-de-prueba", ArticleController.prueba);
router.get("/curso", ArticleController.curso);

// Rutas Utiles

router.post("/crear", ArticleController.crear);

module.exports = router;
