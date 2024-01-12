const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema(
    {
        className: {
            type: String,
            unique: true,
            required: true
        },
        schoolName: {
            type: String,
            required: true
        },
        classGrade: {
            type: String,
            required: true
        },
        classRoom: {
            floor: {
                type: Number,
                required: true
            },
            roomNumber: {
                type: Number,
                required: true
            }
        },
        capacity: {
            type: Number,
            required: true
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        students: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.model('Class', classSchema);
