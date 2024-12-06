// backend/routes/appointments.js

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Adjust path if needed

// Route to create a new appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
