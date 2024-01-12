const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        schoolName: {
            type: String,
            required: true
        },
        courseName: {
            type: String,
            required: true
        },
        courseGrade: {
            type: String,
            required: true
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.model('Course', courseSchema);
