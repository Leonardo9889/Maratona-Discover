const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/"



const profile = {
    name:"Leonardo",
    avatar:"https://avatars.githubusercontent.com/u/49963277?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
}

routes
//Request, Response
.get('/', (req,res) =>res.render(views + "index"))
.get('/job', (req,res) =>res.render(views + "job"))
.get('/job/edit', (req,res) =>res.render(views + "job-edit"))
.get('/profile', (req,res) =>res.render(views + "profile", {profile}))

module.exports = routes;