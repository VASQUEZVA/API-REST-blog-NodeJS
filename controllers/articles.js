const validator = require("validator");
const Article = require("../models/Articles");

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Ruta de prueba funcionando correctamente Article - controllers",
  });
};

const curso = (req, res) => {
  return res.status(200).json({
    curso: "API new in React",
    autor: "Victor Vasquez",
  });
};

const crear = async (req, res) => {
    try {
      // Recoger parámetros por POST
      let parametros = req.body;
  
      // Validar datos
      let validar_titulo =
        !validator.isEmpty(parametros.titulo) &&
        validator.isLength(parametros.titulo, { min: 5, max: undefined });
      let validar_contenido = !validator.isEmpty(parametros.contenido);
  
      if (!validar_titulo || !validar_contenido) {
        throw new Error("No se ha validado la información");
      }
  
      // Crear el objeto a guardar
      const article = new Article(parametros);
  
      // Guardar el artículo en la base de datos con async/await
      const articleGuardado = await article.save();
  
      // Devolver resultado
      return res.status(200).json({
        status: "success",
        article: articleGuardado,
        mensaje: "Artículo creado con éxito",
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        mensaje: error.message || "No se ha guardado el artículo",
      });
    }
  };
  

module.exports = {
  prueba,
  curso,
  crear,
};
