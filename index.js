const express = require('express')
const cors = require('cors')
const loguer = require('./loguerMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.use(loguer)

let notes = [
  {
    id: 1,
    content: 'Tengo que parender a programar un BackEnd',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases de FullStack Bootcamp',
    date: '2019-05-30T18:39:34.098Z',
    important: false
  },
  {
    id: 3,
    content: 'Repasar los reto de JS de Minudev',
    date: '2019-05-30T19:20:14.098Z',
    important: true
  }
]

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(notes));
// })

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo cruel</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.content) {
    return res.status(400).json({ error: 'content is required' })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  res.json(newNote)
})

app.use((req, res) => {
  console.log(req.path)
  res.status(404).json({ error: 'Not found' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
