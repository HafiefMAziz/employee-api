const route = require('express').Router()
const employeeRoutes = require('./employeeRoutes.js')

route.get('/', (req, res) => {
    res.render('./index.ejs', {
        title: 'Halaman Index',
    })
})
route.use('/employees', employeeRoutes)

module.exports = route