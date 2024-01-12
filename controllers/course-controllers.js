const Course = require('../models/Course');
const resHandler = require('../middleware/res-handler');

const courseControllers = {};

courseControllers.getAllCourses = async (req, res, next) => {
    const userRole = req.userRole;
    try {
        const courses = await Course.find({ schoolName: req.schoolName });
        if (!courses) {
            const error = new Error();
            error.message = 'failed to fetch courses';
            error.statusCode = 500;
            return next(error);
        }
        res.data = courses
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

courseControllers.getCourseById = async (req, res, next) => {
    const userRole = req.userRole
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            const error = new Error();
            error.message = 'failed to fetch course';
            error.statusCode = 500;
            return next(error);
        }
        res.data = course
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

courseControllers.filterCourses = async (req, res, next) => {
    const userRole = req.userRole
    const { courseName, courseGrade } = req.query;
    const query = {};

    if (!courseName && !courseGrade) {
        const error = new Error();
        error.message = 'invailed query parameters';
        error.statusCode = 422;
        return next(error);
    } else {
        if (courseName) query.courseName = courseName;
        if (courseGrade) query.courseGrade = courseGrade;
    }
    try {
        query.schoolName = req.schoolName;
        const courses = await Course.find(query);
        if (!courses) {
            const error = new Error();
            error.message = 'failed to filter courses';
            error.statusCode = 500;
            return next(error);
        }
        res.data = courses
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

courseControllers.addCourse = async (req, res, next) => {
    const userRole = req.userRole
    const courseData = req.body;
    try {
        courseData.schoolName = req.schoolName;
        const course = await Course.create(courseData);
        if (!course) {
            const error = new Error();
            error.message = 'failed to add course';
            error.statusCode = 500;
            return next(error);
        }
        res.data = course;
        res.message = 'created successfully!';
        res.statusCode = 201;
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

courseControllers.editCourse = async (req, res, next) => {
    const userRole = req.userRole
    const courseId = req.params.id;
    const courseData = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, courseData, { new: true });
        if (!updatedCourse) {
            const error = new Error();
            error.message = 'failed to update course';
            error.statusCode = 500;
            return next(error);
        }
        res.data = updatedCourse
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

courseControllers.deleteCourse = async (req, res, next) => {
    const userRole = req.userRole
    const courseId = req.params.id;
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            const error = new Error();
            error.message = 'failed to delete course';
            error.statusCode = 500;
            return next(error);
        }
        res.data = deletedCourse;
        res.message = 'deleted successfully!';
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

module.exports = courseControllers;
