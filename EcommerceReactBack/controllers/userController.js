const { User, Post, Token, Sequelize,Order, Product } = require('../models/index.js');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']
const {Op} = Sequelize;
const UserController = {
  // Endpoint que nos traiga la información del usuario conectado junto a los pedidos que tiene y los productos que contiene cada pedido

 async getUserInfo(req, res) {
    try {
      const userInfo = await User.findByPk(req.user.id, {
        include: [
          {
            model: Order,
            include: [Product],
          },
        ],
      });

      if (!userInfo) {
        return res.status(404).json({ message: 'Usuario no encontrado o no tiene datos relacionados.' });
      }

      res.json(userInfo);
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      res.status(500).json({ message: 'Error al obtener información del usuario.' });
    }
  },


  findAll(req, res) {
    User.findAll()
      .then(user => res.status(200).json(user))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener relaciones');
      });
  },
create(req, res) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Faltan datos obligatorios');
  }

  const hashedPassword = req.body.password ? bcrypt.hashSync(req.body.password, 10) : undefined;

  if (hashedPassword === undefined) {
    return res.status(400).send('La contraseña es requerida');
  }

  User.create({ name, email, password: hashedPassword, role })
    .then(user => res.status(201).send({ message: 'Usuario creado con éxito', user }))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al crear usuario');
    });
},
    login(req,res){
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(!user){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            let token = jwt.sign({ id: user.id }, jwt_secret);
 			      Token.create({ token, UserId: user.id });
            res.send({ message: 'Bienvenid@' + user.name, user, token });
        })

    },
    async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }

      await user.destroy();

      res.status(200).send('Usuario eliminado con éxito');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar usuario');
    }
  },
  
  async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
        }
    }
  //ADD MORE METHODS HERE

};

module.exports = UserController;