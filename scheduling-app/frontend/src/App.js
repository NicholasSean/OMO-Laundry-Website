// src/App.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        dateTime: null // Use null initially for Date object
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleDateTimeChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            dateTime: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format the dateTime to ISO string for compatibility with MongoDB if necessary
        const submissionData = {
            ...formData,
            dateTime: formData.dateTime ? formData.dateTime.toISOString() : null,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/appointments', submissionData);
            console.log("Appointment saved:", response.data);
            alert("Appointment scheduled successfully!");

            // Clear form fields
            setFormData({
                name: '',
                phone: '',
                address: '',
                dateTime: null
            });
        } catch (error) {
            console.error("Error saving appointment:", error);
            alert("Failed to schedule appointment. Please try again.");
        }
    };

    return (
        <div className="container">
            <h1>Schedule an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="dateTime">Date & Time</label>
                <DatePicker
                    selected={formData.dateTime}
                    onChange={handleDateTimeChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeIntervals={60} // Only allow 1-hour intervals
                    minDate={new Date()} // Optional: restrict to current date onwards
                    placeholderText="Select Date and Time"
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
