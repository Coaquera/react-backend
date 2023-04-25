const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

//request es lo que la persona solicita
//response lo que nosotros respondemos
const createUser = async(req,res = response) => {

    const {email,password} = req.body;
    try {

        let usuario = await Usuario.findOne({email});
        console.log(usuario);

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese correo',
            });
        }

        //const {name,email,password} = req.body;
        usuario = new Usuario(req.body);
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //Grabar en base de datos, promesa
        await usuario.save();
        
        //Genera Json Web Token = JWT
        const token = generarJWT(usuario.id,usuario.name);

        //si la creacion sale bien se registra
        res.status(201).json({
            ok:true,
            msg: 'registrado',
            uid: usuario.id,
            name: usuario.name,
            token: token,
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el admin'
        });
    }


    //ejemplo de validation
    // if (name.length <5) {
    //     return res.status(400).json({
    //         ok:false,
    //         msg:'el nombre debe de ser de 5 letras'
    //     });
    // }

    //console.log(req.body);
    // res.status(201).json({
    //     ok:true,
    //     msg:'register',
    //     //user:req.body
    //     name,
    //     email,
    //     password,
    // })

}

const loginUser = async(req,res)=>{
    //console.log('Entro al backend al login user')
    const {email,password} = req.body;

    try {
        //buscar el usuario y ver si existe
        const usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no existe con ese email',
            });
        }

        //confirmar los passwords
        //primer parametro es lo que enviamos en la peticion
        //segundo parametro es el usuario en la base de datos
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'password incorrecto',
            })
        }

        //generar nuestro JWT
        const token = generarJWT(usuario.id,usuario.name);

        //Login del usuario
        res.status(200).json({
            ok:true,
            msg:'login',
            uid: usuario.id,
            name: usuario.name,
            token,
        })


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el admin'
        });
    }

}

const revalidateToken = (req,res) => {
    //const {uid,name} = req;//es igual a lo de abajo
    //lo que hace aca es coger en id y name y el token
    //aca el token debe estar activo
    const uid = req.uid;
    const name = req.name;

    //Generar un numero JWT y
    //retornarlo en esta peticion
    const token = generarJWT(uid,name);

    res.json({
        ok:true,
        uid,
        name,
        token, 
    }
    )
}

//exportamos crear usuario
module.exports = { 
    createUser,
    loginUser,
    revalidateToken,
}
