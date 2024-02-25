// const express = require('express');
// const app = express();
// const PORT = 3000;

// const cors = require('cors');

// // Configuración simple de CORS para permitir peticiones desde 'http://localhost:5173'
// app.use(cors({
//     origin: 'http://localhost:5173'
// }));

// // Middleware para parsear JSON
// app.use(express.json());

// // Conectar las rutas
// app.use('/users', require('./routes/userRoutes'));
// app.use('/products', require('./routes/productRoutes'));
// app.use('/orders', require('./routes/orderRoutes'));
// app.use('/categories', require('./routes/categoryRoutes'));

// app.listen(PORT, () => {
//   console.log(`Servidor en ejecución en el puerto http://localhost:${PORT}`);
// });