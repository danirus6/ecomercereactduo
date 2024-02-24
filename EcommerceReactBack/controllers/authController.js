// authController.js
const bcrypt = require('bcrypt');
const { User } = require('../models/index.js');

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashedPassword
      });

      res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },
  // Otros métodos relacionados con la autenticación
};

module.exports = AuthController;
