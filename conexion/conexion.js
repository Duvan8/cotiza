const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "localhost",
  database: "cotizacion",
  user: "root",
  password: "",
});
conexion.connect(function (error) {
  if (error) {
    console.log("error en la conexion");
    throw error;
  } else {
    console.log("CONEXION EXITOSA");
  }
});

module.exports = conexion;