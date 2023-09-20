const route = require('express').Router()
const employeeRoutes = require('./employeeRoutes.js')

route.get('/', (req, res) => res.send('Hello World!'))
route.use('/employees', employeeRoutes)

module.exports = route