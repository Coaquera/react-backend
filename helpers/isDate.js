const moment = require ('moment');
//(value,rest) //rest es el resto de informacion
const isDate = (value) => {
    
    if (!value) {
        return false;
    }

    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    }else{
        return false;
    }
}

module.exports = {
    isDate,
}
