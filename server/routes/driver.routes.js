const DriverConroller = require('../controllers/driver.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/getDrivers', DriverConroller.getDrivers)
    app.post('/api/driverRequest/:userId', DriverConroller.newDriver)
    app.get('/api/removeRequest/:id', DriverConroller.deleteRequest)
    app.get('/api/updateRole/:id', DriverConroller.approveRequest)
    app.get('/api/getRequest', DriverConroller.getRequests)
    app.get('/api/removeDriver/:id', DriverConroller.removeDriver)
    
}