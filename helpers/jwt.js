const jwt = require('jsonwebtoken');
const { Promise } = require('mongoose');


//debe recibir lo que yo necesito colocar como
//payload de mi token
const generarJWT = (uid,name) => {
    
    const payload = {uid,name};
    
        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {expiresIn: '2h'
        });

        if (!token) {
            return 'No se puede generar el token'
        }

        return token;

}

module.exports = {
    generarJWT
}