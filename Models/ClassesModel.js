const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    timetable: [{ type: Schema.Types.ObjectId, ref: 'TimeTable' }],
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
