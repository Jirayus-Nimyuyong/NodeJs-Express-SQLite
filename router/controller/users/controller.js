const { pool } = require('../../../sqlite-connect')
const { v4: uuidv4 } = require('uuid')

const createUser = async (req, res) => {
  try {
    const {
      code,
      name,
      password,
      type,
      mobilePhone,
      email
    } = req.body
    const sqlAddUser = `
    INSERT INTO 
      users
        (
          users_id,
          user_code, 
          user_name, 
          password, 
          type, 
          mobile_phone_no, 
          email
        )
    VALUES(?, ?, ?, ?, ?, ?, ?)`
    const values = [uuidv4(), code, name, password, type, mobilePhone, email]
    pool.run(sqlAddUser, values, function (err) {
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

const getUser = (req, res) => {
  try {
    const sqlGetUsers = 'SELECT * FROM users'
    pool.all(sqlGetUsers, (err, rows) => {
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

const getUserById = (req, res) => {
  try {
    const { Id } = req.params
    const sqlGetUser = 'SELECT * FROM users WHERE user_code = ?'
    const value = [Id]
    pool.get(sqlGetUser, [`${value}`], (err, row) => {
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

const updateUser = (req, res) => {
  try {
    const {
      params: { Id },
      body: {
        code,
        name,
        password,
        type,
        mobilePhone,
        email
      }
    } = req
    const sqlUpdate = `
      UPDATE
        users
      SET
        user_code = ?,
        user_name = ?,
        password  = ?,
        type = ?,
        mobile_phone_no = ?,
        email = ?
      WHERE
        user_code = ?`
    const values = [code, name, password, type, mobilePhone, email, Id]
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

const deleteUser = (req, res) => {
  try {
    const { Id } = req.params
    const sqlDelete = 'DELETE FROM users WHERE user_code = ?'
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
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser
}
