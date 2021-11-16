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

/**
 * Make connection to db, and throws error if connection fails
 */
con.connect((error) => {
  if (error) { throw error }
  console.info('Connected!')
})

/**
 * Word definition model
 * @param {object} entry - object containing the definitions of the term as returned form db
 * @function
 */
const WordDefinition = function (entry) {
  this.word = entry.word
  this.wordtype = entry.wordtype
  this.definition = entry.definition
}

/**
 * Function to make a request to database with Select sql statement
 * @param {string} word - the search term
 * @param {function} result - callback function that excutes to send result back
 * @function 
 */
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
