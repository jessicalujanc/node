const mongoose = require("mongoose");

// const DB_HOST = process.env.DB_HOST;
// const DB_PORT = process.env.DB_PORT;
// const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(`mongodb://127.0.0.1:27017/dn2024`)
  .then(() => {
    console.log("conectado");
  })
  .catch((error) => console.log(error));

  module.exports = mongoose;
