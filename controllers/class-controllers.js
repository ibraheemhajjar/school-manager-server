const Class = require('../models/Class');
const resHandler = require('../middleware/res-handler');

const classControllers = {};

classControllers.getAllClasses = async (req, res, next) => {
    const userRole = req.userRole;
    try {
        const classes = await Class.find({ schoolName: req.schoolName });
        if (!classes) {
            const error = new Error();
            error.message = 'failed to fetch classes';
            error.statusCode = 500;
            return next(error);
        }
        res.data = classes
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

classControllers.getClassById = async (req, res, next) => {
    const userRole = req.userRole
    const classId = req.params.id;
    try {
        const theClass = await Class.findById(classId);
        if (!theClass) {
            const error = new Error();
            error.message = 'failed to fetch classe';
            error.statusCode = 500;
            return next(error);
        }
        res.data = theClass
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

classControllers.filterClasses = async (req, res, next) => {
    const userRole = req.userRole
    const { classGrade, capacity } = req.query;
    const query = {};

    if (!classGrade && !capacity) {
        const error = new Error();
        error.message = 'invailed query parameters';
        error.statusCode = 422;
        return next(error);
    } else {
        if (classGrade) query.classGrade = classGrade;
        if (capacity) query.capacity = capacity;
    }
    try {
        query.schoolName = req.schoolName;
        const theClasses = await Class.find(query);
        if (!theClasses) {
            const error = new Error();
            error.message = 'failed to filter classes';
            error.statusCode = 500;
            return next(error);
        }
        res.data = theClasses
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

classControllers.addClass = async (req, res, next) => {
    const userRole = req.userRole
    const classData = req.body;
    try {
        const theClass = await Class.findOne({ className: classData.className })
        if (theClass) {
            const error = new Error();
            error.message = 'class name already used';
            error.statusCode = 400;
            return next(error);
        }
        classData.schoolName = req.schoolName;
        const newClass = await Class.create(classData);
        if (!newClass) {
            const error = new Error();
            error.message = 'failed to add classe';
            error.statusCode = 500;
            return next(error);
        }
        res.data = newClass;
        res.message = 'created successfully!';
        res.statusCode = 201;
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

classControllers.editClass = async (req, res, next) => {
    const userRole = req.userRole
    const classId = req.params.id;
    const classtData = req.body;
    try {
        const updatedClass = await Class.findByIdAndUpdate(classId, classtData, { new: true });
        if (!updatedClass) {
            const error = new Error();
            error.message = 'failed to update classe';
            error.statusCode = 500;
            return next(error);
        }
        res.data = updatedClass
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

classControllers.deleteClass = async (req, res, next) => {
    const userRole = req.userRole
    const classId = req.params.id;
    try {
        const deletedClass = await Class.findByIdAndDelete(classId);
        if (!deletedClass) {
            const error = new Error();
            error.message = 'failed to delete classe';
            error.statusCode = 500;
            return next(error);
        }
        res.data = deletedClass;
        res.message = 'deleted successfully!';
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

classControllers.addStudent = async (req, res, next) => {
    const userRole = req.userRole
    const classId = req.params.classId;
    const studentId = req.params.studentId;
    try {
        const theClass = await Class.findById(classId);
        if (!theClass) {
            const error = new Error();
            error.message = 'class not found, failed to add student';
            error.statusCode = 500;
            return next(error);
        }
        theClass.students.push(studentId);
        await theClass.save();
        res.data = theClass;
        res.message = 'added successfully!';
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}


module.exports = classControllers;
