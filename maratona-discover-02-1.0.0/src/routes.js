const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/"



const profile = { // objeto de teste para enviar no HTML
    name:"Leonardo",
    avatar:"https://avatars.githubusercontent.com/u/49963277?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hours": 75
}


const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2, 
        "total-hours": 1,
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

function remainingDays(job){ // função para calcular os dias restantes para a entrega do projeto;
        // Cálculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // Esta realizando a divisão do total de horas por dias que vai trabalhar, tendo como resultado o dia da entrega ( toFixed() transforma em um valor inteiro)

        const createdDate = new Date(job.createdAt) // Recebe os milisegundos na data de criação, e transforma em uma data
        const dueDay = createdDate.getDate() + Number(remainingDays) // Soma a data de criação com o tempo restante para a entrega, e resulta nos dias restante para a entrega
        const dueDateInMs = createdDate.setDate(dueDay) // Transformar a data que falta em milisegundos

        const timeDiffInMs = dueDateInMs - Date.now() // calcula o dia faltante ( em milesegundos ) subtraindo com a data de agora/hoje

        //ransformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24 // Calculo para transformar os milesegundos em data
        const dayDiff = Math.floor(timeDiffInMs / dayInMs) // Tem como resultado os dias faltantes para a conclusão ( Math.floor = arredonda a data em um valor inteiro e para baixo)

        return dayDiff // resultado dos dias restantes
}

routes
//Request, Response
.get('/', (req,res) => {
    
    const updatadJobs = jobs.map((job) => {
        //Ajustes no job
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress' // Condicional ternaria ( verifica se chegou no dia 0 e adiciona 'done' se chegou ou 'progrss' se nõa chegou)

        return {
            ...job, //espalhamento
            remaining,
            status,
            budget: profile["value-hours"] * job["total-hours"]
        }
    }) 

   return res.render(views + "index", {jobs: updatadJobs})
}) // Renderizando a página index


.get('/job', (req,res) =>res.render(views + "job")) // Renderizando a página job
.post('/job', (req,res) => {
    // req.body = { name: 'fdaf', 'daily-hours': '2', 'total-hours': '4' }

    const lastId = jobs[jobs.length -1]?.id ||1 // Verifica se no array se possui um valor inserido

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