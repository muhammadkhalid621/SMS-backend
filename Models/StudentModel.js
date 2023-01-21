const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    roll_number: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    parent_name: {
        type: String,
        required: true
    },
    parent_email: {
        type: String,
        required: true
    },
    parent_phoneNumber: {
        type: String,
        required: true
    },
    emergency_contact_name: {
        type: String,
        required: true
    },
    emergency_contact_phone: {
        type: String,
        required: true
    },
    admission_date: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
