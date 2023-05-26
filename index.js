const http = require('http')
const express = require('express')
const chalk = require('chalk')
const fs = require('fs/promises')
const path = require('path')
const {addNote, getNotes, removeNote, updateNote} = require('./notes.controller')

const port = 3000
const basePath = path.join(__dirname, 'pages')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', async (request, response) => {
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
    })
})

app.post('/', async (request, response) => {
    console.log(request.body.title)
    await addNote(request.body.title)
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        message: 'Note has been created',
    })
})

app.delete('/:id', async (request, response) => {
    await removeNote(request.params.id)
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        message: 'Note has been deleted',
    })

})

app.put('/:id', async (request, response) => {
    await updateNote(request.params.id, request.body)
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        message: 'Note has been updated',
    })

})

app.listen(port, () => {
    console.log(chalk.green(`Server started on port ${port} ...`))
})