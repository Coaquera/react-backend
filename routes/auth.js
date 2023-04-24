/*
    Rutas de usuario / Auth
    host + /api/auth
*/
const {Router} = require('express');
const router = Router();
const {createUser,loginUser,revalidateToken} = require('../controllers/auth');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email is obligatorio').isEmail(),
        check('password','El password debe ser mas de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    createUser
    );

router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser mas de 6 de caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUser
);

router.get('/renew',validarJWT,revalidateToken);


//expotacion del router
module.exports = router;