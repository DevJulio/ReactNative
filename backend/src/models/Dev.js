const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({//aqui é criado a disposição da entidade dev no banco de dados
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});


module.exports = mongoose.model('Dev', DevSchema)//primeiro parametro nome da tabela