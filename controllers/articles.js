const Article = require("../models/Articles");
const fs = require("fs");
const { validarArticulo, validarId } = require("../helpers/validar");


const crear = async (req, res) => {
  try {
    const parametros = req.body;

    // Validar artículo con el helper
    const errorValidacion = validarArticulo(parametros);
    if (errorValidacion) {
      return res
        .status(400)
        .json({ status: "error", mensaje: errorValidacion.mensaje });
    }

    const article = new Article(parametros);
    const articleGuardado = await article.save();

    return res
      .status(200)
      .json({
        status: "success",
        mensaje: "Artículo creado con éxito",
        article: articleGuardado,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", mensaje: "No se ha guardado el artículo" });
  }
};

const consultar = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ fecha: -1 });

    if (!articles.length)
      return res
        .status(404)
        .json({ status: "error", mensaje: "No se han encontrado artículos" });

    return res
      .status(200)
      .json({ status: "success", mensaje: "Consulta exitosa", articles });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", mensaje: "Error al consultar artículos" });
  }
};

const listarUno = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .json({ status: "error", mensaje: "El ID no es válido" });

    const article = await Article.findById(id);
    if (!article)
      return res
        .status(404)
        .json({ status: "error", mensaje: "Artículo no encontrado" });

    return res
      .status(200)
      .json({ status: "success", mensaje: "Consulta exitosa", article });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", mensaje: "Error al buscar el artículo" });
  }
};

const borrar = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .json({ status: "error", mensaje: "El ID no es válido" });

    const articleBorrado = await Article.findByIdAndDelete(id);
    if (!articleBorrado)
      return res
        .status(404)
        .json({ status: "error", mensaje: "Artículo no encontrado" });

    return res
      .status(200)
      .json({
        status: "success",
        mensaje: "Artículo eliminado correctamente",
        article: articleBorrado,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", mensaje: "Error al eliminar el artículo" });
  }
};

const editar = async (req, res) => {
  try {
    let id = req.params.id;
    let parametros = req.body;

    // Validar artículo con el helper
    const errorValidacion = validarArticulo(parametros);
    if (errorValidacion) {
      return res
        .status(400)
        .json({ status: "error", mensaje: errorValidacion.mensaje });
    }

    const articleActualizado = await Article.findOneAndUpdate(
      { _id: id },
      { titulo: parametros.titulo, contenido: parametros.contenido },
      { new: true }
    );

    if (!articleActualizado)
      return res
        .status(404)
        .json({
          status: "error",
          mensaje: "No se ha encontrado el artículo para actualizar",
        });

    return res
      .status(200)
      .json({
        status: "success",
        mensaje: "Artículo actualizado con éxito",
        article: articleActualizado,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        mensaje: "No se ha podido actualizar el artículo",
      });
  }
};

const subir = (req, res) => {


  // Cpaturar el fichero de imagen subido
  if(!req.file && !req.file){
    return res.status(404).json({
      status: "error",
      mensaje: "Petision invalida",
    });

  }

  // Nombre del archivo
    let nombreArchivo = req.file.originalname;

  // Extension del archivo
  let archivo_split = nombreArchivo.split("\.");
  let extension = archivo_split[1];

  // comprobar extension correcta
  if (extension !== "png" && extension !== "jpg" &&
     extension !== "jpeg" && extension !== "gif") {

      // borrar archivo  y dar rspuesta
      
      fs.unlink(req.file.path, (error) => {
        return res.status(400).json({
          status: "error",
          mensaje: "Extensión del imagen inválida",
        });
      });

     }else{

      return res.status(200).json({
        status: "success",
        archivo_split,
        file: req.file
      });
     }
};

module.exports = {
  crear,
  consultar,
  listarUno,
  borrar,
  editar,
  subir,
};
