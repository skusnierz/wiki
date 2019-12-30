import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const Course = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: String,
    ects: {
        type: Number,
        min: 1,
        max: 15
    },
    semester: {
        type: Number,
        min: 1,
        max: 10
    },
    courseForm: {
        type: String,
        enum: ['Lecture', 'Exercise', 'Lab', 'Project'],
        default: 'Lab'
    },
    maxStudents: {
        type: Number,
        required: true
    },
    enrolledStudents: [String],
    ratings: [
        {
            studentId: String,
            rating: Number
        }
    ]

}, {
    timestamps: true
});

// Course.plugin(URLSlugs('name', { field: 'slug', update: true }));

export default mongoose.model('Course', Course);