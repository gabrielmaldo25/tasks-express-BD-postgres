const { Pool } = require("pg");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  /* ssl: {
    rejectUnauthorized: true,
    ca:fs.readFileSync('')
  }, */
});

//verificar conexion
pool.connect((error, client, release) => {
  if (error) {
    console.log("Error de conexión: ", error);
  } else {
    console.log("Conexión exitosa");
    release()
  }
});

module.exports = pool;
