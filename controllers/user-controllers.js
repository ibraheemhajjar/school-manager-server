const User = require('../models/User');
const resHandler = require('../middleware/res-handler');
const nameFormatter = require('../utils/name-formatter');
const bcrypt = require('bcrypt');
const userControllers = {};

userControllers.getAllStudents = async (req, res, next) => {
    const userRole = req.userRole
    try {
        const students = await User.find({
            schoolName: req.schoolName,
            role: 'student'
        });
        if (!students) {
            const error = new Error();
            error.message = 'failed to fetch students';
            error.statusCode = 500;
            return next(error);
        }
        res.data = students
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.getStudentById = async (req, res, next) => {
    const userRole = req.userRole
    const studentId = req.params.id;
    try {
        const student = await User.findOne({ _id: studentId, role: 'student' });
        if (!student) {
            const error = new Error();
            error.message = 'failed to find student';
            error.statusCode = 500;
            return next(error);
        }
        res.data = student
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.filterStudents = async (req, res, next) => {
    const userRole = req.userRole
    const { firstName, lastName, dateOfBirth, address, classRoom } = req.query;
    const query = {};

    if (!firstName && !lastName && !dateOfBirth && !address && !classRoom) {
        const error = new Error();
        error.message = 'invailed query parameters';
        error.statusCode = 422;
        return next(error);
    } else {
        if (firstName) query.firstName = { "$regex": `${nameFormatter(firstName)}` };
        if (lastName) query.lastName = { "$regex": `${nameFormatter(lastName)}` };
        if (dateOfBirth) query.dateOfBirth = dateOfBirth;
        if (address) query.address = { "$regex": `${address}` };
        if (classRoom) query.classRoom = classRoom;
        query.role = 'student'
    }
    try {
        query.schoolName = req.schoolName;
        const students = await User.find(query);
        if (!students) {
            const error = new Error();
            error.message = 'failed to filter students';
            error.statusCode = 500;
            return next(error);
        }
        res.data = students
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.addStudent = async (req, res, next) => {
    const userRole = req.userRole
    const studentData = req.body;
    const password = req.body.password;
    try {
        const student = await User.findOne({ email: studentData.email })
        if (student) {
            const error = new Error();
            error.message = 'email already used';
            error.statusCode = 400;
            return next(error);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        studentData.password = hashedPassword;
        studentData.firstName = nameFormatter(studentData.firstName)
        studentData.middleName = nameFormatter(studentData.middleName)
        studentData.lastName = nameFormatter(studentData.lastName)
        studentData.schoolName = req.schoolName;
        const newStudent = await User.create(studentData);
        if (!newStudent) {
            const error = new Error();
            error.message = 'failed to add student';
            error.statusCode = 500;
            return next(error);
        }
        res.data = newStudent;
        res.message = 'created successfully!';
        res.statusCode = 201;
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

userControllers.editStudent = async (req, res, next) => {
    const userRole = req.userRole
    const studentId = req.params.id;
    const studentData = req.body;
    if (studentData.firstName) {
        studentData.firstName = nameFormatter(studentData.firstName);
    }
    if (studentData.middleName) {
        studentData.middleName = nameFormatter(studentData.middleName);
    }
    if (studentData.lastName) {
        studentData.lastName = nameFormatter(studentData.lastName);
    }
    try {
        const updatedStudent = await User.findByIdAndUpdate(studentId, studentData, { new: true });
        if (!updatedStudent) {
            const error = new Error();
            error.message = 'failed to update student';
            error.statusCode = 500;
            return next(error);
        }
        res.data = updatedStudent
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

userControllers.deleteStudent = async (req, res, next) => {
    const userRole = req.userRole
    const studentId = req.params.id;
    try {
        const deletedStudent = await User.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            const error = new Error();
            error.message = 'failed to delete student';
            error.statusCode = 500;
            return next(error);
        }
        res.data = deletedStudent;
        res.message = 'deleted successfully!';
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

userControllers.addCourse = async (req, res, next) => {
    const userRole = req.userRole
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    try {
        const student = await User.findById(studentId);
        if (!student) {
            const error = new Error();
            error.message = 'student not found, failed to add course';
            error.statusCode = 500;
            return next(error);
        }
        student.courses.push(courseId);
        await student.save();
        res.data = student;
        res.message = 'added successfully!';
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

// teacher users controllers

userControllers.getAllTeachers = async (req, res, next) => {
    const userRole = req.userRole;
    try {
        const teachers = await User.find({ schoolName: req.schoolName, role: 'teacher' });
        if (!teachers) {
            const error = new Error();
            error.message = 'failed to fetch teachers';
            error.statusCode = 500;
            return next(error);
        }
        res.data = teachers;
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

userControllers.getTeacherById = async (req, res, next) => {
    const userRole = req.userRole
    const teacherId = req.params.id;
    try {
        const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
        if (!teacher) {
            const error = new Error();
            error.message = 'failed to find teacher';
            error.statusCode = 500;
            return next(error);
        }
        res.data = teacher
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.filterTeachers = async (req, res, next) => {
    const userRole = req.userRole
    const { firstName, lastName, dateOfBirth, address, classRoom } = req.query;
    const query = {};

    if (!firstName && !lastName && !dateOfBirth && !address && !classRoom) {
        const error = new Error();
        error.message = 'invailed query parameters';
        error.statusCode = 422;
        return next(error);
    } else {
        if (firstName) query.firstName = { "$regex": `${nameFormatter(firstName)}` };
        if (lastName) query.lastName = { "$regex": `${nameFormatter(lastName)}` };
        if (dateOfBirth) query.dateOfBirth = dateOfBirth;
        if (address) query.address = { "$regex": `${address}` };
        if (classRoom) query.classRoom = classRoom;
        query.role = 'teacher'
        query.schoolName = req.schoolName;
    }
    try {
        const teachers = await User.find(query);
        if (!teachers) {
            const error = new Error();
            error.message = 'failed to filter teachers';
            error.statusCode = 500;
            return next(error);
        }
        res.data = teachers
        resHandler(null, req, res, next);
    } catch (err) {
        throw err
    }
}

userControllers.addTeacher = async (req, res, next) => {
    const userRole = req.userRole
    const teacherData = req.body;
    const password = req.body.password;
    try {
        const teacher = await User.findOne({ email: teacherData.email })
        if (teacher) {
            const error = new Error();
            error.message = 'email already used';
            error.statusCode = 400;
            return next(error);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        teacherData.password = hashedPassword;
        teacherData.schoolName = req.schoolName;
        const newTeacher = await User.create(teacherData);
        if (!newTeacher) {
            const error = new Error();
            error.message = 'failed to add teacher';
            error.statusCode = 500;
            return next(error);
        }
        res.data = newTeacher;
        res.message = 'created successfully!';
        res.statusCode = 201;
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

userControllers.editTeacher = async (req, res, next) => {
    const userRole = req.userRole
    const teacherId = req.params.id;
    const teacherData = req.body;
    if (teacherData.firstName) {
        teacherData.firstName = nameFormatter(teacherData.firstName);
    }
    if (teacherData.middleName) {
        teacherData.middleName = nameFormatter(teacherData.middleName);
    }
    if (teacherData.lastName) {
        teacherData.lastName = nameFormatter(teacherData.lastName);
    }
    try {
        const updatedTeacher = await User.findByIdAndUpdate(teacherId, teacherData, { new: true });
        if (!updatedTeacher) {
            const error = new Error();
            error.message = 'failed to update teacher';
            error.statusCode = 500;
            return next(error);
        }
        res.data = updatedTeacher
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

userControllers.deleteTeacher = async (req, res, next) => {
    const userRole = req.userRole
    const teacherId = req.params.id;
    try {
        const deletedTeacher = await User.findByIdAndDelete(teacherId);
        if (!deletedTeacher) {
            const error = new Error();
            error.message = 'failed to delete teacher';
            error.statusCode = 500;
            return next(error);
        }
        res.data = deletedTeacher;
        res.message = 'deleted successfully!';
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

userControllers.addCourseToTeacher = async (req, res, next) => {
    const userRole = req.userRole
    const teacherId = req.params.teacherId;
    const courseId = req.params.courseId;
    try {
        const teacher = await User.findById(teacherId);
        if (!teacher) {
            const error = new Error();
            error.message = 'teacher not found, failed to add course';
            error.statusCode = 500;
            return next(error);
        }
        teacher.courses.push(courseId);
        await teacher.save();
        res.data = teacher;
        res.message = 'added successfully!';
        resHandler(null, req, res, next);
    } catch (err) {
        throw err;
    }
}

module.exports = userControllers
