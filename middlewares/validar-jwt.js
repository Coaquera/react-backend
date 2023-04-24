const { response } = require('express');
const jwt = require("jsonwebtoken");
//reponse es para tener el tipado
const validarJWT = (req,res = response,next) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'no hay token en la peticion',
        });
    }

    try {
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );
        
        //actualiza o modifica el valor de la request
        //por referencia y esto pasa al siguiente metodo
        //con el next()
        //console.log('lo que tiene antes',req);
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido',
        });
    }

    //console.log(token);
    next();
}

module.exports = {
    validarJWT
}
