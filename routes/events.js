
/*
    events routes
    /api/events
*/ 

//todas tienen que pasar por la validadicon JWT
const {Router} = require('express');
const router = Router();
const { crearEvento, updateEvento, eliminarEvento, getEvento } = require("../controllers/events");
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
//Al hacer esto todo las peticiones que se encuentre abajo de esto
//tendran que pasar por la validacion de JWT
//de decir en vez de hacer esto:
//router.get('/',validarJWT,getEvento),router.post('/',validarJWT,crearEvento)
//router.put('/:id',validarJWT,updateEvento),router.delete('/:id',validarJWT,eliminarEvento);
//entonces de la otra forma seria
router.use(validarJWT);


//Obtener eventos
router.get('/',getEvento);

//crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligaotira').custom(isDate),
        check('end','Fecha de finalizacion es obligatrio').custom(isDate),
        validarCampos
    ],
    crearEvento
    );

// //actualzar evento
router.put('/:id',updateEvento);

// //borrar evento
router.delete('/:id',eliminarEvento);

module.exports = router;