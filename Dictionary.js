//filename: Dictionary.js
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

/**
 * a middleware function that need to be called when get request comes to `/`
 * @param {object} req - request object
 * @param {object} res - response object
 * @function
 */
const lookupWordFromDictionary = (req, res) => {
  Word.findByWord(req.query.data.term, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.send([])
      } else {
        console.log(`Error retrieving definition with search term ${req.query.data.term}`)
        res.send([])
      }
    } else res.send(data)
  })
}

app.get('/', lookupWordFromDictionary)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} ...`)
})
