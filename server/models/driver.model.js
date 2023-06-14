const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    age: {
        type: Number,
        min: 20
    },
    driverLicense: {
        type: String,
        required: [true, "Driver License is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
}, {timestamps: true})

module.exports = mongoose.model('Driver', DriverSchema)