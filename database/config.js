const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN,{
            // useNewUrlParser:true, //actual viene por defecto
            // useUnifiedTopology:true,//actual viene por defecto
            // useCreateIndex:true,//actual viene por defecto
        });

        console.log('DB online')
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }


}

module.exports = {
    dbConnection
}