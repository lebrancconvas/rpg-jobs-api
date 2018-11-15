const express = require('express')
const app = express()
const port = 8080
const jobs = require('./job')
const body = require('body-parser')

app.use(body.json())
app.use(body.urlencoded({extended : true}))

app.get('/',(req,res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/jobs',(req,res) => {
    res.json(jobs)
})

app.get('/jobs/:id',(req,res) => {
    res.json(jobs.find(job => job.id === req.params.id))
})

app.post('/jobs',(req,res) => {
    jobs.push(req.body)
    res.status(201).json(req.body)
})

app.put('/jobs/:id',(req,res) => {
    let updateIndex = jobs.findIndex(job => job.id === req.params.id)
    res.json(Object.assign(jobs[updateIndex],req.body))
})

app.delete('/jobs/:id',(req,res) => {
    let deletedIndex = jobs.findIndex(job => job.id === req.params.id)
    jobs.splice(deletedIndex,1)
    res.status(204).send()
})

app.listen(port,() => {
    console.log(`Server Run @ Port ${port}`)
})