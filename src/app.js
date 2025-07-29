const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const { default: helmet } = require("helmet");

dotenv.config();
const app = express();

const PORT = 3000;
app.use(helmet())
app.use(bodyParser.json());
app.use("/tasks", taskRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto: ${PORT}`);
});
