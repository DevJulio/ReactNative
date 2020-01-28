const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')//instanciando objeto de outra classe para acessar os métodos

module.exports = {
    async index(req, res) {//método para busca
        const { latitude, longitude, techs } = req.query; // acessando informações da requisição

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //método in verifica quais devs possuem as tecnologias vindas da requisicao ou seja, filtro na query
            },
            location: {//métodos com $ são metodos do mongodb e esses métodos a seguir são responsaveis por geolocalização
                $near: {// https://docs.mongodb.com/manual/reference/operator/query/
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000, //metros
                },
            },
        });

        //console.log(techsArray)
        return res.json({ devs })

    }
}