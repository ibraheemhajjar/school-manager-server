const express = require('express');
const router = express.Router();
const courseControllers = require('../controllers/course-controllers')
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const { validate, createCourseValidationRules } = require('../middleware/validator');


// course routes
router.get('/', isAuth, isAdmin, courseControllers.getAllCourses);
router.get('/course/:id', isAuth, isAdmin, courseControllers.getCourseById);
router.get('/filterCourses', isAuth, isAdmin, courseControllers.filterCourses);
router.post('/addCourse', isAuth, isAdmin, createCourseValidationRules(), validate, courseControllers.addCourse);
router.put('/editCourse/:id', isAuth, isAdmin, createCourseValidationRules(), validate, courseControllers.editCourse);
router.delete('/deleteCourse/:id', isAuth, isAdmin, courseControllers.deleteCourse);

module.exports = router;
