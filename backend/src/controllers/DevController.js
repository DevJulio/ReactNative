const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require ('../utils/parseStringAsArray')//instanciando objeto de outra classe para acessar os métodos
module.exports = {
    async index(req, res) { //método para busca
        const devs = await Dev.find()

        return res.json(devs);
    },

    async store(req, res) {

        const { github_username, techs, latitude, longitude } = req.body // desestruturação, acessando um objeto em específico de dentro do retorno


        let dev = await Dev.findOne({github_username})


        if(!dev){
            const Apires = await axios.get(`https://api.github.com/users/${github_username}`) //chamada de api externa usando o axios

            const { name = login, avatar_url, bio } = Apires.data
    
            const techsArray = parseStringAsArray(techs) //acessando métododo de outra classe
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
    
             dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            })
    
        }


  
        // console.log(name, avatar_url, bio, github_username )
        return res.json(dev)
    }
};