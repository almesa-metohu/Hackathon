const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                console.log('register')
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY)

                return res.cookie("usertoken", userToken, {
                    httpOnly: true
                }).json({ msg: "success!", user: user });
            })
            .catch(err => {
                console.log("Error register: "+err)
                return res.status(400).json(err)
            });
    },

    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email })

        if(user === null) {
            console.log(user)
            return res.status(400).json({ errors: { email: { message: "There is no user with this email" } } });
        }

        const correctPassword = bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {

            return res.status(400).json({ errors: { password: { message: "The passcode is incorrect" } } });
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
            res.cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!" ,user:user});
    },

    logout: (req, res) => {
        console.log("logOut")
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    getOneUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .populate('Ride')
            .populate('driverDetails')
            .then(user => {
                if(!user) {
                    return res.status(400).json({error: "User not found"})
                }
                else{
                    res.json(user)
                }
            })
            .catch(err => res.json(err))
    },

    getUsers: (req, res) => {
        User.find()
            .populate('Ride')
            .populate('driverDetails')
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    editUser: (req, res) => {
        User.findOne({_id: req.params.id})
        .then(user => {
            if(!user) {
                return res.status(404).json({error: 'User not found'})
            }
            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.email = req.body.email
            user.location = req.body.location
            
            return user.save();
        })
            .then(updatedUser => {
                res.json(updatedUser);
            })
            .catch(err => {
                res.status(500).json({ error: err.errors });
            });
    },

    changeRole: (req, res) => {
        User.findOne({_id: req.params.id})
            .then(user => {
                if(!user) {
                    return res.status(404).json({error: 'User not found'})
                }
                user.role = req.body.role
                return user.save()
            })
            .then(updatedUser => {
                res.json(updatedUser);
            })
            .catch(err => {
                res.status(500).json({ error: err.errors });
            });
    }
}