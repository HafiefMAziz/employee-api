const employeeRoute = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController.js')


employeeRoute.get('/', EmployeeController.show)
employeeRoute.get('/:id', EmployeeController.show)
employeeRoute.post('/create', EmployeeController.create)
employeeRoute.get('/delete/:id', EmployeeController.delete)
employeeRoute.post('/update/:id', EmployeeController.update)

module.exports = employeeRoute
