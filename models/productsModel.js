const mongoose = require("../config/mongodb");

// Definir el esquema de productos
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    codigo: Number,
    description: String,
    categoria: 
    {
        type: mongoose.Schema.ObjectId, // Enlaza los documentos de productos con categorias
        ref: "categoria"
    },
    destacado: {
        type: Boolean, // Cambiar el tipo de datos a booleano
        default: false // Establecer un valor predeterminado
    }
});

// Crear el modelo de productos a partir del esquema
const ProductsModel = mongoose.model("productos", productSchema);

module.exports = ProductsModel;
