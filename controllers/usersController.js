const UsersModel = require("../models/usersModel"); //Acá es donde puedo empezar a manipular la BD
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const create = async function (req, res, next) {
  //asincrónica, la manejo con un 'try' 'catch'
  try {
    console.log(req.body);
    const user = new UsersModel(req.body);
    //Guardar en base de datos
    const document = await user.save();
    res.status(201).json(document);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

//AUTENTICACION, el método login determina si el usuario está registrado o no
const login = async function (req, res, next) {
  try {
    const user = await UsersModel.findOne({ email: req?.body?.email });
    if (!user) {
      return res.status(401).json({
        message: "El email y/o contraseña no se encuentran registrados",
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        message: "El email y/o contraseña no se encuentran registrados",
      });
    }
    //Si el usuario existe y la password son iguales ahí recien voy a generar ahi recien voy a gwenerar el token y le voy a devolver el token al cliente que me está haciendo el request
    const token = jwt.sign({ userId: user._id }, req.app.get("secretKey"), {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  create,
  login,
};
