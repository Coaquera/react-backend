
const { response } = require("express");
const Evento = require('../models/Evento');
const getEvento = async(req,res=response) => {

    //regresa todos lo eventos
    //const eventos = await Evento.find();

    //pero necesitamos datos como nombre del usuario 
    //entonces
    //si solo quiere el name y email populare('user','name email')
    const eventos = await Evento.find()
                                .populate('user');

    return res.json({
        ok:true,
        eventos,
    });
}

const crearEvento = async(req,res=response) => {

    const evento = new Evento(req.body);

    try {
        //console.log("que tiene el req",req);
        //console.log("que tiene el req",req.uid);

        //console.log('antes el evento',evento);
        evento.user = req.uid;
        //solo tiene el id pero con el populate('user') muestra datos del user
        //console.log('despues el evento', await evento.populate('user'));

        const eventoGuardado = await evento.save();
        
        res.json({
            ok:true,
            evento:eventoGuardado,
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador',
        });
    }
}

const updateEvento = async( req, res = response ) => {
    
    //este es id que colocamos en http/.../123456
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //esto regresa 2 veces el antiguo documento
        //y el nuevo documento, pero con en new:true
        //solo regresa el actualizado
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const eliminarEvento = async(req,res) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }
    
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete( eventoId);

        res.json({
            ok: true,
            evento: eventoEliminado
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    crearEvento,
    getEvento,
    updateEvento,
    eliminarEvento,
}