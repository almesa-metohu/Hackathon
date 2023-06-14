const mongoose = require('mongoose')

const RideSchema = new mongoose.Schema({
    /* date: {
        type: Date,
        required: [true, 'Date is required']
    }, */
    hour: {
        type: Number,
        min: 1,
        max: 12,
        required: [true, 'Time is required']
    },
    minutes: {
        type: Number,
        min: 0,
        max: 59,
        required: [true, 'Time is required']
    },
    amPM: {
        type: String,
        required: [true, 'Time is required']
    },
    people: {
        type: Number,
        min: 1,
        max: 4,
        required: [true, 'Number of people is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    price: {
        type: Number,
        min: 500,
        max: 5000,
        required: [true, 'Price/person is required']
    },
    driver: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    passangers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {timestamps: true})

module.exports = mongoose.model('Ride', RideSchema)