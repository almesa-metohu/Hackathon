const DriverConroller = require('../controllers/driver.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/driverRequests', DriverConroller.getDrivers)
    app.post('/api/driverRequest/:userId', DriverConroller.newDriver)
    app.delete('/api/removeRequest/:id', DriverConroller.deleteRequest)
}