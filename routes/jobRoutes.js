const jobRoute = require('express').Router()
const JobController = require('../controllers/JobController.js')


jobRoute.get('/', JobController.show)
jobRoute.get('/:id', JobController.show)
jobRoute.post('/create', JobController.create)
jobRoute.get('/delete/:id', JobController.delete)
jobRoute.get('/update/:id', JobController.updateForm)
jobRoute.post('/update/:id', JobController.update)

module.exports = jobRoute
