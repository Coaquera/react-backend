const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Imprime todos los procesos que estan corriendo
//por ejemplo los procesos que corren en node y
//enviorement=.env
//console.log(process.env);


//crear el servidor de express
const app = express();

//Conexion a Base de datos mongo
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());


//rutas
//esto significa que todo lo que vaya a importar './routes/auth'
//lo va habilitar en la ruta './api/auth'
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));
//TODO:CRUD: Eventos


//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});