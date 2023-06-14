const RideController = require('../controllers/ride.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/newRide/:userId', RideController.newRide)
    app.get('/api/rides', RideController.getRides)
    app.get('/api/ride/:id', RideController.getOneRide)
}