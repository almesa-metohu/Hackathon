const Ride = require('../models/ride.model')
const User = require('../models/user.model')

module.exports = {
    newRide: (req, res) => {
        Ride.create(req.body)
            .then(ride => {
                ride.driver = req.params.userId,
                ride.save()
                User.findOneAndUpdate(
                    {_id: req.params.userId},
                    { $push: { rides: ride._id } },
                    {new: true, runValidators: true}
                )
                    .populate('rides')
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

    getRides: (req, res) => {
        Ride.find()
        .populate('driver')
            .then(ride => res.json(ride))
            .catch(err => res.json(err))
    }
}