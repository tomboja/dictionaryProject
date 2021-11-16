//filename: word.js
/**
 * Online dictionary project
 * author: Temesgen Dessalegn
 * year: 2021
 */
const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'entries'
})

con.connect((error) => {
  if (error) { throw error }
  console.log('Connected!')
})

const WordDefinition = function (entry) {
  this.word = entry.word
  this.wordtype = entry.wordtype
  this.definition = entry.definition
}

WordDefinition.findByWord = (word, result) => {
  con.query(`SELECT * FROM entries WHERE word = '${word}'`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res)
      return
    }

    result({ kind: "not_found" }, null)
  })
}

module.exports = WordDefinition
