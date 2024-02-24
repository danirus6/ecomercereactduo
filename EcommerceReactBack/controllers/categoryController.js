const { Category,Product } = require('../models/index.js');
const { Op } = require('sequelize');

const CategoryController = {


  create(req, res) {
    const { categoryName, description } = req.body;
    
    Category.create({
      categoryName,
      description,
    })
      .then(category => res.status(201).send({ message: 'Categoría creada con éxito', category }))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al crear categoría');
      });
  },

   async getAllWithProducts(req, res) {
    try {
      const categoriesWithProducts = await Category.findAll({
        include: [{
          model: Product,
          attributes: ["productName"],
        }],
      });
      res.status(200).json(categoriesWithProducts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener productos con categorías');
    }
  },

  findById(req, res) {
    Category.findByPk(req.params.id)
      .then(category => res.status(200).json(category))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener relaciones');
      });
  },

findByName(req, res) {
  const categoryName = req.params.categoryName;
  Category.findAll({
    where: {
      categoryName: {
        [Op.like]: `%${categoryName}%` 
      }
    }
  })
    .then(category => res.status(200).json(category))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener productos por nombre');
    });
},

};

module.exports = CategoryController;
