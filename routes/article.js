
const express = require("express");
const router = express.Router();
const multer = require("multer");
const ArticleController = require("../controllers/articles");

const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./imagenes/articulos/')
    },

    filename: function(req, file, cb){
        cb(null, "articulo" + Date.now() + file.originalname);
    }
});

const subidos = multer({storage: almacenamiento});





router.post("/crear", ArticleController.crear);
router.get("/consultar", ArticleController.consultar);
router.get("/consultar/:id", ArticleController.listarUno);
router.delete("/consultar/:id", ArticleController.borrar);
router.put("/consultar/:id", ArticleController.editar);
router.post("/subir-imagen/:id", [subidos.single("file0")], ArticleController.subir)
router.get("/imagen/:fichero", ArticleController.imagen);
router.get("/buscar/:busqueda", ArticleController.buscador)

module.exports = router;
