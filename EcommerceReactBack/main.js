const express = require("express");
const app = express();
const PORT = 3000;
const { typeError } = require("./middlewares/errors");
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/orders", require("./routes/orders"));

app.use(typeError);

app.listen(PORT, () =>
  console.log("The server is up and running on port " + PORT)
);

module.exports = app;