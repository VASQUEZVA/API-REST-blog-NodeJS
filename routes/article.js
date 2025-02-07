
const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/articles");


router.post("/crear", ArticleController.crear);
router.get("/consultar", ArticleController.consultar);
router.get("/consultar/:id", ArticleController.listarUno);
router.delete("/consultar/:id", ArticleController.borrar);
router.put("/consultar/:id", ArticleController.editar);


module.exports = router;
