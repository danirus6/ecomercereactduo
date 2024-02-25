const { Order, User, Product } = require("../models/index.js");

const OrderController = {
  async create(req, res) {
    try {
      const { number, date, ProductId } = req.body;

      if (!ProductId) {
        return res
          .status(400)
          .send(
            "All fields (number, date, and UserId, ProductId ) must be filled"
          );
      }
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      const existingUser = await User.findByPk(req.user.id);
      console.log(existingUser.id);
      if (!existingUser) {
        return res.status(400).send({ error: "Not logged" });
      }

      const createdOrder = await Order.create({
        number,
        date: formattedDate,
        UserId: existingUser.id,
      });
      await createdOrder.addProduct(ProductId);

      res.status(201).send({
        message: "Order successfully created",
        order: createdOrder,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [{ model: Product, through: { attributes: [] } }],
      });
      res.send(orders);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = OrderController;