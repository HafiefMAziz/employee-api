const route = require('express').Router()
const employeeRoutes = require('./employeeRoutes.js')
const employerRoutes = require('./employerRoutes.js')
const jobRoutes = require('./jobRoutes.js')

route.get('/', (req, res) => {
    res.render('./index.ejs', {
        title: 'Halaman Index',
    })
})
route.use('/employees', employeeRoutes);
route.use('/employers', employerRoutes);
route.use('/jobs', jobRoutes);
module.exports = route