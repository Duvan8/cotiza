const express = require("express");
const conexion = require("../conexion/conexion");
const controlador = require("../controlador/controlador");
const router = express.Router();

router.get("/", controlador.index);
router.post("/login", controlador.login);
router.get("/usuarios", controlador.usuarios);
router.get("/crearusu", controlador.crearusu);
router.get("/cotizacion", controlador.cotizacion);
router.get("/crearcot", controlador.crearcot);
router.get("/actucot", controlador.actucot);
router.get("/productos", controlador.productos);
router.get("/actupro", controlador.actupro);
router.get("/crearpro", controlador.crearpro);
router.get("/vistusuarios", controlador.vistusuarios);
router.get("/informes", controlador.informes);
router.get("/fletes", controlador.fletes);
router.get("/pruebajson", controlador.pruebajson);
router.get("/render", controlador.render);

router.post("/usuarios", controlador.usuarios);
router.post("/busq", controlador.busq);
router.post("/inserusu", controlador.inserusu);
router.post("/actualizar", controlador.usuact);

router.post("/usueli", controlador.usueli);

router.post("/cotizacion", controlador.cotizacion);
router.post("/insercot", controlador.insercot);
router.post("/actucot", controlador.actucot);
router.post("/accot", controlador.accot);

router.post("/newpro", controlador.newpro);
router.post("/productos", controlador.productos);
router.get('/actupro/:id', controlador.actpro);
router.get('/productos/:id', controlador.elipro);
router.post('/prooo', controlador.prooo);

router.post("/vistusuarios", controlador.vistusuarios);
router.post("/viscot", controlador.viscot);

router.post("/actuflet", controlador.actuflet);

router.post("/pruebajson", controlador.prueba);


router.get('/api/detailProduct/:idProduct', controlador.precio);

router.get('/actucot/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM cotizacion WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('actucot.ejs', {user:results[0]});
        }        
    });
});

router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM cotizacion WHERE id=?',[id] , (error) => {
        if (error) {
            throw error;
        }else{            
            res.redirect('/cotizacion')
        }        
    });
});

module.exports = router;