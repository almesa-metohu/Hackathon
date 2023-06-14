const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    driverLicense: {
        type: String,
/*         required: [true, "Driver License is required"]
 */    },
    idCard: {
        type: String,
        required: [true, "ID Card is required"]
    },
}, {timestamps: true})

module.exports = mongoose.model('Driver', DriverSchema)