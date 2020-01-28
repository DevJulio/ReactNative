const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const { setupWebSocket } = require('./websocket')

const app = express()
const server = http.Server(app)

setupWebSocket(server)

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-ce61t.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(cors())
app.use(express.json())
app.use(routes)
//asada
//get buscar informação;
//post criar uma nova informação;
//put editar alguma coisa 
//delete adivinha oq faz


server.listen(3333);