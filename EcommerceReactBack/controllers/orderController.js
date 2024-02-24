const { Order, Product } = require('../models/index.js');

const OrderController = {

  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [{ model: Product, attributes: ["productName"], through: { attributes: [] } }],
      });
      res.send(orders);
    } catch (error) {
      console.error(error);
    }
  },

  create(req, res) {

    const { orderDate, totalAmount, userId } = req.body;

    Order.create({
      orderDate,
      totalAmount,
      userId,
    })
      .then(order => {
        order.addProduct(req.body.productId)
        res.status(201).send({ message: 'Orden creada con éxito', order })
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al crear orden');
      });
  },
};

module.exports = OrderController;
