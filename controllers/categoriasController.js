const categoriesModel = require("../models/categoriasModel");

module.exports = {
    getAll: async function(req, res, next) {
        try {
            const categorias = await categoriesModel.find();
            res.json(categorias);
        } catch (e) {
            next(e);
        }
    },
    create: async function(req, res, next) {
        try {
            console.log(req.body);
            console.log(req.body.name);

            const document = new categoriesModel({
                name: req.body.name
            });

            const response = await document.save();

            res.json(response);
        } catch (e) {
            next(e);
        }
    }
};
