//filename: word.js
/**
 * Online dictionary project
 * author: Temesgen Dessalegn
 * year: 2021
 */

/**constant */ const LOCALHOST = 'localhost'
/**constant */ const ROOT = 'root'
/**constant */ const PASSWORD = 'password'
/**constant */ const DATABASE = 'entries'

const mysql = require('mysql')

const con = mysql.createConnection({
  host: LOCALHOST,
  user: ROOT,
  password: PASSWORD,
  database: DATABASE
})

con.connect((error) => {
  if (error) { throw error }
  console.info('Connected!')
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
