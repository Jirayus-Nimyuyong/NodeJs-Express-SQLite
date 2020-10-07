const { pool } = require('../../../sqlite-connect')
const { v4: uuidv4 } = require('uuid')

const createBook = (req, res) => {
  try {
    const { code, name } = req.body
    const sqlAddBooks = `
      INSERT INTO 
        books
          (
            books_id,
            books_code,
            books_name
          )
      VALUES(?, ?, ?)`
    const values = [uuidv4(), code, name]
    pool.run(sqlAddBooks, values, function (err) {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      res.status(201).json({
        status: 201,
        message: 'Created Success'
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getBook = (req, res) => {
  try {
    const sqlGetBooks = 'SELECT * FROM books'
    pool.all(sqlGetBooks, (err, rows) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      res.status(200).json(rows)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getBookById = (req, res) => {
  try {
    const { Id } = req.params
    const sqlGetBook = 'SELECT * FROM books WHERE books_code = ?'
    const value = [Id]
    pool.get(sqlGetBook, [`${value}`], (err, row) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      res.status(200).json(row)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const updateBook = (req, res) => {
  try {
    const {
      params: { Id },
      body: {
        code,
        name
      }
    } = req
    const sqlUpdate = `
      UPDATE
        books
      SET
        books_code = ?,
        books_name = ?
      WHERE
        books_code = ?`
    const values = [code, name, Id]
    pool.run(sqlUpdate, values, (err) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      res.status(200).json({
        status: 200,
        message: 'Updated Success'
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const deletBook = (req, res) => {
  try {
    const { Id } = req.params
    const sqlDelete = 'DELETE FROM books WHERE books_code = ?'
    const value = [Id]
    pool.run(sqlDelete, value, (err) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      res.status(200).json({
        status: 200,
        message: 'Deleted Success'
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

module.exports = {
  createBook,
  getBook,
  getBookById,
  updateBook,
  deletBook
}
