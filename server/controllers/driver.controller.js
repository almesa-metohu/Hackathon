const Driver = require('../models/driver.model')
const User = require('../models/user.model')

module.exports = {
    newDriver: (req, res) => {
        Driver.create(req.body)
            .then(driver => {
                User.findOneAndUpdate
            })
    }
}