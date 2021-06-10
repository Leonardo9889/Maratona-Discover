const express = require('express');
const server = express();
const routes = require('./routes');
const port = 3000;

server
// Habilitando arquivos static
.use(express.static("public")) // Usando a pasta "Public" como arquivos estaticos ( não haverá modificação )

//Template engine
.set('view engine', 'ejs') // Setando a template engine EJS para trabalhar junto do backend

//Usar o req.body 
.use(express.urlencoded({extended:true})) // Permitindo o uso dos dados enviados do frontend para o backend

// Chamando as rotas
.use(routes) // Usando o arquivos de rotas

server.listen(port, () => console.log (`Server runing on port: ${port}`)); // Iniciando o servidor