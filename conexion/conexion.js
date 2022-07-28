const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "bu6izfnez9lfbl2cpm64-mysql.services.clever-cloud.com",
  database: "bu6izfnez9lfbl2cpm64",
  user: "u5ubvwp44qg5xqzd",
  password: "VKdFLxqoXNQZlJf5BjwK",
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