const { Router } = require('express')

const { createUser, getUser, getUserById, updateUser, deleteUser } = require('./controller/users/controller')
const { createBook, getBook, getBookById, updateBook, deletBook } = require('./controller/books/controller')

const router = Router()

router.post('/users', createUser)
router.get('/users', getUser)
router.get('/users/:Id', getUserById)
router.put('/users/:Id', updateUser)
router.patch('/users/:Id', updateUser)
router.delete('/users/:Id', deleteUser)

router.post('/books', createBook)
router.get('/books', getBook)
router.get('/books/:Id', getBookById)
router.put('/books/:Id', updateBook)
router.patch('/books/:Id', updateBook)
router.delete('/books/:Id', deletBook)

module.exports = router
