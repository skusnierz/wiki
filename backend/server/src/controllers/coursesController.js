import Course from '../models/course'

export default {
    async findOne(req, res, next) {
        const course = await Course.findOne({ _id : req.params._id });
        if (!course) return next();
        return res.status(200).send({ data: course });
    },

    async findAll(req, res) {
        const courses = await Course.find().sort({ createdAt: 'desc' });
        return res.status(200).send({ data: courses });
    },

    async create(req, res) {
        const course = await new Course({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            ects: req.body.ects,
            semester: req.body.semester,
            courseForm: req.body.courseForm,
            maxStudents: req.body.maxStudents,
            enrolledStudents: req.body.enrolledStudents,
            ratings: req.body.ratings
        }).save();

        return res.status(201).send({ data: course, message: `Course was created` });
    },

    async update(req, res, next) {
        const course = await Course.findOne({ '_id': req.params.id  });
        if (!course) return next();
        course.name = req.body.name;
        course.description = req.body.description;
        course.image = req.body.image;
        course.ects = req.body.ects;
        course.semester = req.body.semester;
        course.courseForm = req.body.courseForm;
        course.maxStudents = req.body.maxStudents;
        course.enrolledStudents = req.body.enrolledStudents;
        course.ratings = req.body.ratings;
        await course.save();

        return res.status(200).send({ data: course, message: `Course was updated` });
    },

    async remove(req, res, next) {
        const course = await Course.findOne({ '_id': req.params.id  });
        if (!course) return next();
        await course.remove();

        return res.status(200).send({ message: `Course was removed` });
    }
}