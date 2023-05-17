import express from 'express'
import cors from 'cors'
import { readFiles } from './utils/parser.js'
import { SearchQuery } from './utils/searchQuery.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
  const pageDb = await readFiles()
  const searchQuery = new SearchQuery(pageDb)

  let start = process.hrtime()
  const results = await searchQuery.query(req.body.input)
  const elapsed = process.hrtime(start)[1] / 1_000_000_000 // nanoseconds to seconds
  results.unshift({ numberOfResults: results.length, ExecTimeSec: elapsed.toFixed(3) })
  start = process.hrtime()

  return res.json(results.slice(0, 6))
})

app.listen(8000, () => {
  console.log('Server running at http://localhost:8000')
  console.log('Press Ctrl-C to terminate...')
})
