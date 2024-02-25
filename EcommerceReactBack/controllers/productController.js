const { Product, Category } = require("../models/index.js");
const { Op } = require("sequelize");

const ProductController = {
  create(req, res, next) {
    const { name, price, CategoryId } = req.body;
    const existingCategory = Category.findByPk(CategoryId);
    // if (!name || !price || !CategoryId) {
    //   res
    //     .status(400)
    //     .send("All camps (name, price and CategoryId) have to be filled");
    // }

    // if (!existingCategory) {
    //   return res.status(400).send({ error: "Category not found" });
    // }

    Product.create(req.body)
      .then((product) =>
        res
          .status(201)
          .send({ message: "Product succesfully created", product })
      )
      .catch((err) => {
        console.log(err);
        // res.send(err.errors[0].message);
        next(err);
      });
  },
  getAll(req, res) {
    const { name, price } = req.query;
    let whereCondition = {};
    if (name) {
      whereCondition = {
        name: {
          [Op.like]: `%${name}%`,
        },
      };
    }
    if (price) {
      whereCondition = {
        price: {
          [Op.like]: `%${price}%`,
        },
      };
    }

    Product.findAll({ where: whereCondition })
      .then((products) => res.send(products))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "There was a problem of getting all products" });
      });
  },
  async updateById(req, res) {
    const { CategoryId } = req.body;
    const existingProduct = await Product.findByPk(req.params.id);
    const existingCategory = await Category.findByPk(CategoryId);
    if (!existingProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    if (CategoryId) {
      if (!existingCategory) {
        return res.status(400).send({ error: "Category not found" });
      }
    }

    await Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        CategoryId: req.body.CategoryId,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send("Product was succesfully updated");
  },
  async delete(req, res) {
    try {
      const deletedProductCount = await Product.destroy({
        where: { id: req.params.id },
      });

      if (deletedProductCount > 0) {
        res.send("The product successfully deleted");
      } else {
        res.status(404).send({ error: "Product not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  getByIdCateg(req, res) {
    Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ["name"] }],
    })
      .then((product) => {
        if (product) {
          res.send(product);
        } else {
          res.status(404).send({ error: "Product is not found" });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
      });
  },
  getById(req, res) {
    Product.findByPk(req.params.id)
      .then((product) => {
        if (product) {
          res.send(product);
        } else {
          res.status(404).send({ error: "Product is not found" });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
      });
  },

  highToLow(req, res) {
    Product.findAll({
      order: [["price", "DESC"]],
    })
      .then((products) => res.send(products))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "There was a problem of getting products" });
      });
  },
};

module.exports = ProductController;