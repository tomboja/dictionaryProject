/**
 * Online dictionary project
 * author: Temesgen Dessalegn
 * year: 2021
 */
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const Word = require('./word')

const PORT = 8080
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: false }))

lookupWordFromDictionary = (req, res) => {
  Word.findByWord(req.query.keyword, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.send([])
      } else {
        console.log(`Error retrieving definition with keyword ${req.params.keyword}`)
        res.send([])
      }
    } else res.send(data)
  })
}

app.get('/', lookupWordFromDictionary)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} ...`)
})
