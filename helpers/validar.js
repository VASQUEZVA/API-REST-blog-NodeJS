const validator = require("validator");
const { Error } = require("mongoose");


const validarArticulo = (parametros) => {
  if (!parametros.titulo || validator.isEmpty(parametros.titulo)) {
    return { campo: "titulo", mensaje: "El título es obligatorio." };
  }
  if (!validator.isLength(parametros.titulo, { min: 5 })) {
    return { campo: "titulo", mensaje: "El título debe tener al menos 5 caracteres." };
  }
  if (!parametros.contenido || validator.isEmpty(parametros.contenido)) {
    return { campo: "contenido", mensaje: "El contenido no puede estar vacío." };
  }
  return null; // Si todo es válido, devuelve null
};

const validarId = (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("El ID proporcionado no es válido");
  }
};

module.exports = { validarArticulo, validarId };

