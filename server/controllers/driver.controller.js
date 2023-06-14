const Driver = require('../models/driver.model')
const User = require('../models/user.model')

module.exports = {
    newDriver: (req, res) => {   //forma ku behet request per driver
        Driver.create(req.body)
            .then(driver => {
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    { $push: {driverDetails: driver._id}},
                    {new: true, runValidators: true}
                )
                .populate('driverDetails')
                .then((updatedUser) => {
                    res.status(200).json({ message: 'Driver created', user: updatedUser })
                })
                .catch(err => {
                    console.log('Failed to update user with driver id' + err)
                    res.json(err)
                })
            })
            .catch(err => {
                console.log('Failed to create a ride' + err)
                res.json(err)
            })
    },

    getDrivers: (req, res) => { //marrim request e drivers tek admin
        Driver.find()
        .populate('driverDetails')
            .then(driver => res.json(driver))
            .catch(err => res.json(err))
    },

    deleteRequest: (req, res) => {     //kur shtypim accept ose decline request ajo do hiqet nga lista
        Driver.deleteOne({_id: req.params.id})
        .then(deletedRequest => res.json(deletedRequest))
        .catch(err => res.json(err))
    }
}