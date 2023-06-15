const Ride = require('../models/ride.model')
const User = require('../models/user.model')

module.exports = {
    newRide: (req, res) => {
        console.log(req.body)
        Ride.create(req.body)
            .then(ride => {
                ride.driver = req.params.userId,
                ride.save()
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    { $push: { Ride: ride._id } },
                    {new: true, runValidators: true}
                )
                .populate('Ride')
                .then((updatedUser) => {
                        res.status(200).json({ message: 'Ride created', user: updatedUser })
                    })
                .catch(err => {
                        console.log('Failed to update user with ride id' + err)
                        res.json(err)
                    })
            })
            .catch(err => {
                console.log('Failed to create a ride' + err)
                res.json(err)
            })
    },
    getOneRide: (req, res) => {
        Ride.findOne({ _id: req.params.id })
        .populate('driver')
            .then(ride => res.json(ride))
            .catch(err => res.json(err))
    },
    removeRide: (req, res) => {     //kur shtypim accept ose decline request ajo do hiqet nga lista
        // Driver.deleteOne({_id: req.params.id})
        // .then(deletedRequest => res.json(deletedRequest))
        // .catch(err => res.json(err))
        Ride.deleteOne({_id: req.params.id})
        .then(updateRole => res.json(updateRole))
        .catch(err => res.json(err))
    },

    getRides: (req, res) => {
        Ride.find()
        .populate('driver')
        .populate('passangers')
            .then(ride => res.json(ride))
            .catch(err => res.json(err))
    },
    // getPassengers: (req, res) => {
    //     Ride.find()
    //     .populate('driver')
    //         .then(ride => res.json(ride))
    //         .catch(err => res.json(err))
    // },
    addRide: (req, res) => {
        console.log(req.body)
        Ride.findOneAndUpdate({_id: req.params.id}, { $push: { passangers:req.body.userId } }, {new: true, runValidators: true})
        .then(updateRole => res.json(updateRole))
        .catch(err => res.json(err))
    }
}