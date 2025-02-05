const { conection } = require("./database/conection");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Conectar a la base de datos
conection();

// Configurar CORS
app.use(cors());


// Convertir body a objeto JavaScript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar y cargar rutas
const rutas_articulo = require("./routes/article");
app.use("/api", rutas_articulo);

// Ruta de prueba
app.get("/prueba", (req, res) => {
    console.log("Se ha ejecutado el endpoint de prueba");

    return res.status(200).json({
        curso: "API new in React",
        autor: "Victor Vasquez",
    });
});

// Crear servidor y escuchar peticiones HTTP
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
