const employerRoute = require('express').Router()
const EmployerController = require('../controllers/EmployerController.js')


employerRoute.get('/', EmployerController.show)
employerRoute.get('/:id', EmployerController.show)
employerRoute.post('/create', EmployerController.create)
employerRoute.get('/delete/:id', EmployerController.delete)
employerRoute.get('/update/:id', EmployerController.updateForm)
employerRoute.post('/update/:id', EmployerController.update)

module.exports = employerRoute
