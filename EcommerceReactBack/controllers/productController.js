const { Product, Category } = require('../models/index.js');
const { Op } = require('sequelize');
const ProductController = {

  getAll(req, res) {
    Product.findAll()
      .then(products => res.status(200).json(products))
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: error.message });
      });
  },

  findById(req, res) {
    Product.findByPk(req.params.id)
      .then(product => res.status(200).json(product))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener relaciones');
      });
  },

  findByName(req, res) {
    const productName = req.params.productName;
    Product.findAll({
      where: {
        productName: {
          [Op.like]: `%${productName}%`
        }
      }
    })
      .then(products => res.status(200).json(products))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener productos por nombre');
      });
  },

  findByPrice(req, res) {
    const { price } = req.params;

    Product.findAll({
      where: {
        price: parseFloat(price),
      },
    })
      .then(products => res.status(200).json(products))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener productos por precio');
      });
  },
  async getAllWithCategory(req, res) {
    try {
      const productsWithCategories = await Product.findAll({
        include: [{
          model: Category,
          attributes: ["categoryName"],
        }],
      });

      res.status(200).json(productsWithCategories);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener productos con categorías');
    }
  },

  async getAllOrdered(req, res) {
    try {
      const products = await Product.findAll({
        order: [['price', 'DESC']],
      });
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message, stack: error.stack });
    }
  },


  create(req, res) {
    const { productName, price, categoryId } = req.body;

    // if (!req.user) {
    //   return res.status(401).send('No estás autenticado');
    // }
    if (!productName || !price || !categoryId) {
      return res.status(400).send('Faltan datos obligatorios para crear el producto');
    }

    Product.create({
      productName,
      price,
      categoryId,
    })
      .then(product => res.status(201).send({ message: 'Producto creado con éxito', product }))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al crear producto');
      });
  },

  update(req, res) {


    const productId = req.params.id;
    const { productName, price, categoryId } = req.body;

    Product.findByPk(productId)
      .then(product => {
        if (!product) {
          return res.status(404).send('Producto no encontrado');
        }

        // if (product.userId !== req.user.id) {
        //   return res.status(403).send('No tienes permisos para actualizar este producto');
        // }

        return product.update({
          productName,
          price,
          categoryId,
        });
      })
      .then(updatedProduct => res.status(200).send({ message: 'Producto actualizado con éxito', updatedProduct }))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al actualizar producto');
      });
  },

  delete(req, res) {
    const productId = req.params.id;

    Product.findByPk(productId)
      .then(product => {
        if (!product) {
          return res.status(404).send('Producto no encontrado');
        }


        return product.destroy();
      })
      .then(() => res.status(200).send({ message: 'Producto eliminado con éxito' }))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al eliminar producto');
      });
  },

};

module.exports = ProductController;
