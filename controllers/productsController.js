const productsModel = require("../models/productsModel"); //Acá es donde puedo empezar a manipular la BD

//HOME que trae los productos destacados
const getDestacados = async function (req, res, next) {
  try {
    const destacados = await ProductModel.find({ destacado: true });
    res.json(destacados);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

//   try {
//     const queryFind = {
//       destacado: true, // Agregar el filtro para los productos destacados
//     };

//     const documents = await productsModel.find(queryFind)
//       .populate("categoria")
//       .sort({ name: -1, price: 1 });

//     res.status(200).json(documents);
//   } catch (e) {
//     next(e);
//   }
// };


//Trae un producto por Id
const getById = async function (req, res, next) {
  try {
  const document = await productsModel.findById(req.params.id);
  //retorna un JSON
  res.status(200).json(document);
}
catch (e) {
  next (e);
}
};

//Crea un producto
const create = async function (req, res, next) {
  //asincrónica, la manejo con un 'try' 'catch'
  try {
    console.log(req.body);
    const producto = new productsModel({
      name: req.body.name,
      price: req.body.price,
      codigo: req.body.codigo,
      description: req.body.description,
      categoria: req.body.categoria, 
      destacado: req.body.destacado
      //Tengo que hacer un save si no no se guarda
    });
    //Guardar en base de datos
    const document = await producto.save();
    res.status(201).json(document);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

//Actualiza un producto
const update = async function (req, res, next) {
  try {
    await productsModel.updateOne({_id:req.params.id}, req.body)
    res.status(204);

  } catch (e) {
    console.log("create e", e);
  }
};

//Elimina un producto
const remove = async function (req, res, next) {
  try {
    await productsModel.deleteOne({_id:req.params.id})
    res.status(204);

  } catch (e) {
    console.log("create e", e);
  }
};

module.exports = {
  getDestacados,
  getById,
  create,
  update,
  remove,
};
