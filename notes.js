const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.red.inverse('New note added!'))
    } else {
        console.log(chalk.green.inverse('Note title taken!'))
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    // console.log(title + ' removed')
    const note = notes.filter(function (note) {
        return note.title !== title
    })
    if (notes.length === note.length) {
        console.log(chalk.bgRed("No Note Removed"))
    } else {
        saveNotes(note)
        console.log(chalk.bgGreen('Note removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    let note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.bold.red(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}