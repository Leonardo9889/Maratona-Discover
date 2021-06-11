const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/"



const profile = { // objeto de teste para enviar no HTML
    name:"Leonardo",
    avatar:"https://avatars.githubusercontent.com/u/49963277?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
}


const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2, 
        "total-hours": 60,
        createdAt: Date.now()  
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3, 
        "total-hours": 47,
        createdAt: Date.now()  
    }
]; // Array de jobs

routes
//Request, Response
.get('/', (req,res) => {
    
    const updatadJobs = jobs.map((job) => {
        //Ajustes no job
        // Cálculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // Esta realizando a divisão do total de horas por dias que vai trabalhar, tendo como resultado o dia da entrega ( toFixed() transforma em um valor inteiro)

        const createdDate = new Date(job.createdAt) // Recebe os milisegundos na data de criação, e transforma em uma data
        const dueDay = createdDate.getDate() + Number(remainingDays) // Soma a data de criação com o tempo restante para a entrega, e resulta nos dias restante para a entrega
    }) 

   return res.render(views + "index", {jobs})
}) // Renderizando a página index


.get('/job', (req,res) =>res.render(views + "job")) // Renderizando a página job
.post('/job', (req,res) => {
    // req.body = { name: 'fdaf', 'daily-hours': '2', 'total-hours': '4' }

    const lastId = jobs[jobs.length -1]?.id ||1 // Verifica se no array possui um valor inserido

   jobs.push({ // Enviando o objeto body para o array jobs;
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"], 
        "total-hours": req.body["total-hours"],
        createdAt: Date.now() // Pega a data do agora/hoje
    })
    return res.redirect('/') // redirecionando para a página principal
})
.get('/job/edit', (req,res) =>res.render(views + "job-edit")) // renderizando a página job-edit
.get('/profile', (req,res) =>res.render(views + "profile", {profile})) // Renderizando a página profile

module.exports = routes; // Exportando este arquivo de rotas