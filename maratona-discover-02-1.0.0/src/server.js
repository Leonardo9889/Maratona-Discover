const express = require('express');
const server = express();
const routes = require('./routes');


server
// Habilitando arquivos static
.use(express.static("public"))

//Template engine
.set('view engine', 'ejs')

// Chamando as rotas
.use(routes)

server.listen(3000, () => console.log ("Server Runing"));