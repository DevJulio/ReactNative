const mongoose = require('mongoose');

const PointSchema= new mongoose.Schema({//aqui é criado a disposição da entidade dev no banco de dados

    type:{
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates:{
        type: [ Number],
        required: true
    }
});


module.exports = PointSchema