const RideController = require('../controllers/ride.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/newRide/:userId', RideController.newRide)
    app.get('/api/rides', RideController.getRides)
    app.get('/api/ride/:id', RideController.getOneRide)
    app.patch('/api/addRide/:id', RideController.addRide)
    app.delete('/api/removeRide/:id', RideController.removeRide)
    
    // app.get('/api/rides/getPassangers/:id', RideController.getPassangers)
}