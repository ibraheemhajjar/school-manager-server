const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user-controllers');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const { validate, signupValidationRules } = require('../middleware/validator');

// user routes
// "student" users routes
router.get('/students', isAuth, isAdmin, userControllers.getAllStudents);
router.get('/students/:id', isAuth, isAdmin, userControllers.getStudentById);
router.get('/filterStudents', isAuth, isAdmin, userControllers.filterStudents);
router.post('/students/addStudent', isAuth, isAdmin, signupValidationRules(), validate, userControllers.addStudent);
router.put('/students/edit/:id', isAuth, isAdmin, userControllers.editStudent);
router.delete('/students/deleteStudent/:id', isAuth, isAdmin, userControllers.deleteStudent);
router.get('/student/:studentId/addCourse/:courseId', isAuth, isAdmin, userControllers.addCourse);

// "student" users routes
router.get('/teachers', isAuth, isAdmin, userControllers.getAllTeachers);
router.get('/teachers/:id', isAuth, isAdmin, userControllers.getTeacherById);
router.get('/filterTeachers', isAuth, isAdmin, userControllers.filterTeachers);
router.post('/teachers/addTeacher', isAuth, isAdmin, signupValidationRules(), validate, userControllers.addTeacher);
router.put('/teachers/edit/:id', isAuth, isAdmin, userControllers.editTeacher);
router.delete('/teachers/deleteTeacher/:id', isAuth, isAdmin, userControllers.deleteTeacher);
router.get('/teacher/:teacherId/addCourse/:courseId', isAuth, isAdmin, userControllers.addCourseToTeacher);

module.exports = router;
