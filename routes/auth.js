const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { loginValidationRules, validate, signupValidationRules } = require('../middleware/validator');

// auth routes
router.get('/login', authControllers.getLogin);
router.post('/login', loginValidationRules(), validate, authControllers.postLogin);
router.get('/signup', authControllers.getSignup);
router.post('/signup', signupValidationRules(), validate, authControllers.postSignup);
router.get('/signout', authControllers.getSignout);

module.exports = router;
