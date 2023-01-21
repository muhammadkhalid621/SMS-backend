const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    age: Number,
    address: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        enum: ["Science", "Maths", "Arts"],
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    qualification: {
        type: String,
        required: true
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
