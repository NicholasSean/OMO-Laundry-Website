// backend/models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dateTime: { type: Date, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
