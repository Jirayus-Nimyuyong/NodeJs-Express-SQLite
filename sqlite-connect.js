const sqlite3 = require('sqlite3').verbose()

const pool = new sqlite3.Database('./database/book_store.db', (err) => {
  if (err) {
    console.error(err.message)
  }
})

const connectDB = async () => {
  try {
    const sqlConnect = `
      SELECT 
      strftime('%H:%M:%S %d/%m/%Y','now','localtime') AS "time"`
    pool.all(sqlConnect, (err, rows) => {
      if (err) {
        console.error(err.message)
      }
      console.log(`Connected To The SQLite Database Time ${rows[0].time}`)
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  pool,
  connectDB
}
