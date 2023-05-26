const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote (title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)
    await saveNotes(notes)
    console.log(chalk.green('Note was added!'))
}

async function removeNote (id) {
    const notes = await getNotes()
    const note = notes.find(n => n.id === id.toString())
    if (note) {
        await saveNotes(notes.filter(n => n !== note))
        console.log(chalk.green(`Successfully removed note with id=${id}`))
    } else {
        console.error(chalk.red(`Error: Not found note with id=${id}`))
    }
}

async function updateNote (id, body) {
    delete body.id
    const notes = await getNotes()
    const note = notes.find(n => n.id === id.toString())
    if (note) {
        await saveNotes(notes.map(n => n === note ? {...n, ...body} : n))
        console.log(chalk.green(`Successfully updated note with id=${id}`))
    } else {
        console.error(chalk.red(`Error: Not found note with id=${id}`))
    }
}

async function getNotes () {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes (notes) {
    console.log('saveNotes', notes)
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes () {
    const notes = await getNotes()
    console.log(chalk.green('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.white(note.id), chalk.blue(note.title))
    })
}

module.exports = {addNote, getNotes, printNotes, removeNote, updateNote}