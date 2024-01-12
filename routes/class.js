const express = require('express');
const router = express.Router();
const classControllers = require('../controllers/class-controllers');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const { validate, createClassValidationRules } = require('../middleware/validator');


// class routes
router.get('/', isAuth, isAdmin, classControllers.getAllClasses);
router.get('/class/:id', isAuth, isAdmin, classControllers.getClassById);
router.get('/filter', isAuth, isAdmin, classControllers.filterClasses);
router.post('/addClass', isAuth, isAdmin, createClassValidationRules(), validate, classControllers.addClass);
router.put('/editClass/:id', isAuth, isAdmin, classControllers.editClass);
router.delete('/deleteClass/:id', isAuth, isAdmin, classControllers.deleteClass);
router.post('/:classId/addStudent/:studentId', isAuth, isAdmin, classControllers.addStudent);

module.exports = router;
