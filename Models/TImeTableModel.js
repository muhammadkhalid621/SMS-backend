const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeTableSchema = new Schema({
    class: {
        type: String,
        enum: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"],
        required: true
    },
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);

module.exports = TimeTable;
