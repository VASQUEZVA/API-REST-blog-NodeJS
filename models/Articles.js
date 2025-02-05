const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
  titulo: { 
    type: String,
    require: true,
  },
  contenido:{
    type: String,
    require: true,
    
  },
  fecha:{
    type: Date,
    default: Date.now,
    require: true,
   },
  imagen: {
    type: String,
    default: "default.png",
},


});

module.exports = model("Article",ArticleSchema, "articles")