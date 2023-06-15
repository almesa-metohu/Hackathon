const Driver = require('../models/driver.model')
const User = require('../models/user.model')

module.exports = {
    newDriver: (req, res) => {   //forma ku behet request per driver
        Driver.create(req.body)
            .then(driver => {
                const driverId = driver._id
                console.log(req.params.userId)
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    { driverDetails: driverId },
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
        User.find({role: "driver"})
        .populate('driverDetails')
            .then(driver => res.json(driver))
            .catch(err => res.json(err))
    },

    getRequests: (req, res) => { //marrim request e drivers tek admin
        User.find({role: "user", driverDetails: { $exists: true, $ne: null }})
        .populate('driverDetails')
            .then(driver => res.json(driver))
            .catch(err => res.json(err))
    },

    deleteRequest: (req, res) => {     //kur shtypim accept ose decline request ajo do hiqet nga lista
        // Driver.deleteOne({_id: req.params.id})
        // .then(deletedRequest => res.json(deletedRequest))
        // .catch(err => res.json(err))
        User.findOneAndUpdate({_id: req.params.id}, {driverDetails: null}, {new: true, runValidators: true})
        .then(updateRole => res.json(updateRole))
        .catch(err => res.json(err))
    },
    removeDriver: (req, res) => {     //kur shtypim accept ose decline request ajo do hiqet nga lista
        // Driver.deleteOne({_id: req.params.id})
        // .then(deletedRequest => res.json(deletedRequest))
        // .catch(err => res.json(err))
        User.findOneAndUpdate({_id: req.params.id}, {driverDetails: null,role:"user"}, {new: true, runValidators: true})
        .then(updateRole => res.json(updateRole))
        .catch(err => res.json(err))
    },
   

    approveRequest: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {role: "driver"}, {new: true, runValidators: true})
        .then(updateRole => res.json(updateRole))
        .catch(err => res.json(err))
    }
}