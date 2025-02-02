const mongoose = require('mongoose');

const conection = async()=>{

    try {

       await mongoose.connect("mongodb://localhost:27017/Api_Rest_Blog");
       useNewUrlParser: true;
       useUnifiedTopology: true;
       console.log("Conectado a la base de dates");
        
    } catch (error) {
        console.log(error);
        throw new Error('No se ha podido conectar a la bse de datos');
        
    }
}

module.exports = {
    conection
}