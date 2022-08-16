const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express()
const conexion = require("../conexion/conexion");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const req = require("express/lib/request");
const { off } = require("../conexion/conexion");
const controlador = {};

const storage = multer.diskStorage({
  destination: 'public/imagenes',
  filename: (req,file,cb) => {
    cb(null,file.originalname);
  }
});


controlador.index = (req, res, next) => {
  res.render("index");
};

controlador.crearusu = (req, res, next) => {
  res.render("crearusu");
};

controlador.crearcot = (req, res, next) => {
  res.render("crearcot");
};

controlador.actupro = (req, res, next) => {
  res.render("actupro");
};

controlador.crearpro = (req, res, next) => {
  res.render("crearpro");
};

controlador.vistusuarios = (req, res, next) => {
  res.render("vistusuarios");
};

controlador.informes = (req, res, next) => {
  res.render("informes");
};

controlador.fletes = (req, res, next) => {
  res.render("fletes");
};

controlador.pruebajson = (req, res, next) => {
  res.render("pruebajson");
};



controlador.usuarios = async (req, res) => {
  conexion.query("SELECT * FROM usuarios", (err, resbd) => {
    if (err) {
      next(new Error(err));
      console.log("Error en la consulta");
    } else {
      res.render("usuarios", { datos: resbd });
    }
  });
};

controlador.busq = async (req, res) => {
  const busq = req.body.search;
  conexion.query(
    "SELECT * FROM usuarios WHERE usuario='" + busq + "'",
    (err, resbd) => {
      if (err) {
        console.log("error en consulta individual");
        throw err;
      } else {
        res.render("usuarios", { datos: resbd });
      }
    }
  );
};

controlador.inserusu = async (req, res, next) => {
  const usu = req.body.username;
  const rol = req.body.rol;
  const cor = req.body.email;
  const pass = req.body.password1;
  const tel = req.body.phone;
  const dir = req.body.address;
  const pai = req.body.country;
  const cpai = req.body.countryCode;
  const dec = req.body.discount;
  const con = await bcryptjs.hash(pass, 8);
  conexion.query(
    "INSERT INTO usuarios SET ?",
    {
      usuario: usu,
      rol: rol,
      correo: cor,
      clave: con,
      telefono: tel,
      direccion: dir,
      pais: pai,
      codigo_pais: cpai,
      descuento: dec,
    },
    (err) => {
      if (err) {
        next(new Error(err));
      } else {
        res.redirect("/usuarios");
      }
    }
  );
};

controlador.usuact = async (req, res) => {
  const id = req.body.ii;
  const usu = req.body.uu;
  const cor = req.body.cc;
  const cla = req.body.pp;
  const tel = req.body.tt;
  const dir = req.body.dd;
  const des = req.body.ss;
  const rol = req.body.rr;
  const pass = await bcryptjs.hash(cla, 8);

  conexion.query(
    "UPDATE usuarios SET usuario = '" +
      usu +
      "', correo='" +
      cor +
      "', clave='" +
      pass +
      "', telefono='" +
      tel +
      "', direccion='" +
      dir +
      "', descuento='" +
      des +
      "', rol='" +
      rol +
      "' WHERE id='" +
      id +
      "'",
    (err) => {
      if (err) {
        console.log("error en el controlador de usuact");
        throw err;
      } else {
        res.redirect("usuarios");
      }
    }
  );
};

controlador.usueli = async (req, res) => {
  const usul = req.body.uu;
  console.log("eliminar", usul);
  conexion.query(
    'DELETE FROM usuarios WHERE usuario="' + usul + '"',
    async (err) => {
      if (err) {
        console.log("error al eliminar en usuario");
        throw err;
      } else {
        console.log("usuario eliminado");
        res.redirect("usuarios");
      }
    }
  );
};

controlador.insercot = async (req, res, next) => {
  const usu = req.body.usu;
  const pro = req.body.product;
  const cant = req.body.quantity;
  const purt = req.body.openingType;
  const jam = req.body.jamb;
  const bis = req.body.beveling;
  const cha = req.body.country;
  const acd = req.body.finishOptions;
  const anc = req.body.slabGrossWidthOptions;
  const esp = req.body.thickness;
  const fir = req.body.fireRating;
  const mec = req.body.machiningPrep;
  const jug = req.body.matchingTheDoor;
  const hoj = req.body.leafCount;
  const ent = req.body.handing;
  const con = req.body.doorConstruction;
  const bsd = req.body.doorBeveling;
  const ach = req.body.routedKerfWidth;
  const alt = req.body.height;
  const pre = req.body.prefinish;
  const log = req.session.usuu;
  console.log("usuario" + log);

  conexion.query(
    "INSERT INTO cotizacion SET ?",
    {
      nombre: log,
      producto: pro,
      cantidad: cant,
      apertura: purt,
      jamba: jam,
      biselado: bis,
      chapa_madera: cha,
      acabado: acd,
      ancho: anc,
      espesor: esp,
      resistencia_fuego: fir,
      mecanizado: mec,
      juego_puerta: jug,
      hojas: hoj,
      entrega: ent,
      construcción_puertas: con,
      biselado_puertas: bsd,
      corte_enrutado: ach,
      altura: alt,
      preacabado: pre,
    },
    (err) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/cotizacion");
      }
    }
  );
};

controlador.crearcot = async (req,res) => {
  conexion.query("SELECT * FROM productos",(err,datos)=>{
    if(err){
      console.log("error en consultar productos");
      throw err;
    }
    else{
      res.render("crearcot",{resbd:datos});
    }
  })
}

controlador.viscot = async (req, res, next) => {
  const usu = req.body.usu;
  const pro = req.body.product;
  const cant = req.body.quantity;
  const purt = req.body.openingType;
  const jam = req.body.jamb;
  const bis = req.body.beveling;
  const cha = req.body.country;
  const acd = req.body.finishOptions;
  const anc = req.body.slabGrossWidthOptions;
  const esp = req.body.thickness;
  const fir = req.body.fireRating;
  const mec = req.body.machiningPrep;
  const jug = req.body.matchingTheDoor;
  const hoj = req.body.leafCount;
  const ent = req.body.handing;
  const con = req.body.doorConstruction;
  const bsd = req.body.doorBeveling;
  const ach = req.body.routedKerfWidth;
  const alt = req.body.height;
  const pre = req.body.prefinish;
  const log = req.session.usuu;
  console.log("usuario" + log);

  let hoy = new Date();

  let dia = hoy.getDate();
  let mes = hoy.getMonth() + 1;
  let agnio = hoy.getFullYear();

  dia = ("0" + dia).slice(-2);
  mes = ("0" + mes).slice(-2);

  // AAAA-MM-DD:
  let formato1 = `${agnio}-${mes}-${dia}`;
  console.log(formato1);

  conexion.query(
    "INSERT INTO cotizacion SET ?",
    {
      nombre: log,
      producto: pro,
      cantidad: cant,
      apertura: purt,
      jamba: jam,
      biselado: bis,
      chapa_madera: cha,
      acabado: acd,
      ancho: anc,
      espesor: esp,
      resistencia_fuego: fir,
      mecanizado: mec,
      juego_puerta: jug,
      hojas: hoj,
      entrega: ent,
      construcción_puertas: con,
      biselado_puertas: bsd,
      corte_enrutado: ach,
      altura: alt,
      preacabado: pre,
      creado: formato1,
    },
    (err) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/vistusuarios");
      }
    }
  );
};

controlador.cotizacion = async (req, res) => {
  conexion.query("SELECT * FROM cotizacion", (err, resbd) => {
    if (err) {
      next(new Error(err));
      console.log("Error en la consulta");
    } else {
      res.render("cotizacion", { prub: resbd });
    }
  });
};

controlador.actucot = async (req, res) => {
  const ll = req.body.cc;
  console.log("codigo consulta: " + ll);
  conexion.query(
    "SELECT * FROM cotizacion WHERE id='" + ll + "'",
    (err, results) => {
      if (err) {
        next(new Error(err));
        console.log("Error en la consulta");
      } else {
        res.render("actucot", { datos: results });
        console.log(results);
      }
    }
  );
};

controlador.accot = async (req, res) => {
  const cod = req.body.id;
  const usu = req.body.usu;
  const pro = req.body.product;
  const can = req.body.quantity;
  const pur = req.body.openingType;
  const jam = req.body.jamb;
  const bis = req.body.beveling;
  const cha = req.body.country;
  const acb = req.body.finishOptions;
  const anc = req.body.slabGrossWidthOptions;
  const esp = req.body.thickness;
  const rps = req.body.fireRating;
  const mec = req.body.machiningPrep;
  const jug = req.body.matchingTheDoor;
  const hoj = req.body.leafCount;
  const ent = req.body.handing;
  const con = req.body.doorConstruction;
  const por = req.body.doorBeveling;
  const enr = req.body.routedKerfWidth;
  const alt = req.body.height;
  const pre = req.body.prefinish;

  conexion.query(
    "UPDATE cotizacion SET id='" +
      cod +
      "', nombre='" +
      usu +
      "', producto='" +
      pro +
      "', cantidad='" +
      can +
      "', apertura='" +
      pur +
      "', jamba='" +
      jam +
      "', biselado='" +
      bis +
      "', chapa_madera='" +
      cha +
      "', acabado='" +
      acb +
      "', ancho='" +
      anc +
      "', espesor='" +
      esp +
      "', resistencia_fuego='" +
      rps +
      "',mecanizado='" +
      mec +
      "',juego_puerta='" +
      jug +
      "',hojas='" +
      hoj +
      "',entrega='" +
      ent +
      "',construcción_puertas='" +
      con +
      "', biselado_puertas='" +
      por +
      "', corte_enrutado='" +
      enr +
      "', altura='" +
      alt +
      "', preacabado='" +
      pre +
      "' WHERE id='" +
      cod +
      "'",
    (err, resbd) => {
      if (err) {
        console.log("error en consulta individual");
        throw err;
      } else {
        res.redirect("cotizacion");
      }
    }
  );
};

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file es el `avatar` del archivo
  // req.body tendrá los campos textuales, en caso de haber alguno.
})

controlador.newpro = async (req, res, next) => {
  const nom = req.body.name;
  const dis = req.body.available;
  const pre = req.body.price;
  const des = req.body.description;
  const cod = req.body.svgCode;
  const log = req.session.usuu;
  const img = req.file.originalname;

  var jm;

  if (dis == null) {
    jm = "off";
  } else {
    jm = "on";
  }
  console.log("interruptor " + jm);

  let hoy = new Date();

  let dia = hoy.getDate();
  let mes = hoy.getMonth() + 1;
  let agnio = hoy.getFullYear();

  dia = ("0" + dia).slice(-2);
  mes = ("0" + mes).slice(-2);

  // AAAA-MM-DD:
  let formato1 = `${agnio}-${mes}-${dia}`;
  console.log(formato1);

  conexion.query(
    "INSERT INTO productos SET ?",
    {
      usuario: log,
      nombre: nom,
      creado: formato1,
      disponible: jm,
      precio: pre,
      descripcion: des,
      imagen: img,
      svg: cod,
    },
    (err, resbd) => {
      if (err) {
        console.log("error en ingresar productos");
        throw err;
      } else {
        res.redirect("/productos");
      }
    }
  );
};

controlador.actpro = async (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM productos WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("actupro.ejs", { user: results[0] });
      }
    }
  );
};

controlador.elipro = async (req, res) => {
  const id = req.params.id;
  conexion.query("DELETE FROM productos WHERE id=?", [id], (error) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/productos");
    }
  });
};

controlador.prooo = async (req, res) => {
  const id = req.body.id;
  const nom = req.body.name;
  const des = req.body.description;
  const img = req.body.image;
  const csvg = req.body.svgcode;
  const dis = req.body.available;
  const pre = req.body.price;
  const log = req.session.usuu;

  conexion.query(
    "UPDATE productos SET usuario = '" +
      log +
      "', nombre='" +
      nom +
      "', disponible='" +
      dis +
      "', descripcion='" +
      des +
      "', imagen='" +
      img +
      "', svg='" +
      csvg +
      "', precio='" +
      pre +
      "' WHERE id='" +
      id +
      "'",
    (err) => {
      if (err) {
        console.log("error en actualizar productos");
        throw err;
      } else {
        res.redirect("productos");
      }
    }
  );
};

controlador.productos = async (req, res) => {
  conexion.query("SELECT * FROM productos", (err, resbd) => {
    if (err) {
      next(new Error(err));
      console.log("Error en la consulta");
    } else {
      res.render("productos", { datos: resbd });
    }
  });
};

controlador.vistusuarios = async (req, res) => {
  const cod = req.session.codd;
  conexion.query("SELECT * FROM productos", (err, results) => {
    conexion.query(
      "SELECT * FROM usuarios WHERE id='" + cod + "'",
      (err, resbd) => {
        conexion.query("SELECT * FROM flete", (err, resultsx) => {
          if (err) {
            console.log("error en la consulta para precio");
            throw err;
          } else {
            console.log("consulta exitosa");
            res.render("vistusuarios", {
              valor: results,
              datos: resbd,
              prodct: resultsx,
            });
          }
        });
      }
    );
  });
};

controlador.precio = async (req, res) => {
  const id = req.params.idProduct;
  const cod = req.session.codd;
  console.log("id del producto: " + id);  
  conexion.query(
    "SELECT * FROM productos WHERE nombre='" + id + "'",
    (err, results) => {
      console.log("consulta de los productos "+results)
      conexion.query(
        "SELECT * FROM usuarios WHERE id='" + cod + "'",
        (err, resbd) => {
          conexion.query("SELECT * FROM flete", (err, resultsx) => {
            if (err) {
              console.log("error en la consulta para precio");
              throw err;
            } else {
              console.log("consulta exitosa"+results);
              res.render("vistusuarios", {
                valor: results,
                datos: resbd,
                prodct: resultsx,
              });
            }
          });
        }
      );
    }
  );
};

controlador.fletes = async (req, res) => {
  conexion.query("SELECT * FROM flete", (err, datos) => {
    if (err) {
      throw err;
    } else {
      res.render("fletes", { resbd: datos });
    }
  });
};

controlador.actuflet = async (req, res) => {
  const min = req.body.menor;
  const max = req.body.mayor;
  const imp = req.body.impuesto;

  conexion.query(
    "UPDATE flete SET minflete='" +
      min +
      "', maxflete='" +
      max +
      "', impuesto='" +
      imp +
      "'",
    (err) => {
      if (err) {
        throw err;
      } else {
        res.redirect("fletes");
      }
    }
  );
};

const books = [];

controlador.prueba = (req, res, next) => {
  

  console.log(req.body);
  const { emial, password } = req.body;
  if (!emial || !password) {
    res.status(400).send("los campos no estan llenos");
    return;
  }

  let newBook = {
    emial: emial,
    password: password,
  };

  books.push(newBook);
  res.send("recived");
};

controlador.render = (req, res, next) => {
  res.render("render", {
    books: books,
  });
};

controlador.login = async (req, res, next) => {
  const usu = await req.body.username;
  const con = await req.body.password;
  console.log(usu, con);
  conexion.query(
    "SELECT * FROM usuarios WHERE usuario=?",
    [usu],
    async (err, results) => {
      if (err) {
        next(new Error("Error de consulta login", err));
      }
      if (results != 0) {
        bcryptjs.compare(con, results[0].clave).then((resp) => {
          if (resp === true) {
            req.session.Login = true;
            const usu = (req.session.usuu = results[0].usuario);
            const cod = (req.session.codd = results[0].id);
            let rol = results[0].rol;
            console.log(cod);
            switch (rol) {
              case "admin":
                res.redirect("usuarios");
                break;
              case "cliente":
                res.redirect("vistusuarios");
                break;
            }
          } else {
            console.log("repsuesta incorrecta");
            res.redirect("/");
          }
        });
      } else {
        console.log("datos incorrectos");
        res.redirect("/");
      }
    }
  );
};

/* const log = req.session.usuu; */

module.exports = controlador;
