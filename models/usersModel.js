const mongoose = require("../config/mongodb");
const bcrypt = require("bcrypt");

//Crear schema
const usersSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//Para encriptar la contraseña
usersSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next(); //El next continua la ejecución para que no quede colgado
});

// Con el esquema, creamos el modelo de mongoose
const UsersModel = mongoose.model("users", usersSchema);

module.exports = UsersModel;
