const { check, validationResult } = require('express-validator');

const loginValidationRules = () => {
    return [
        check("email")
            .notEmpty().withMessage("Email should not be empty").bail()
            .isEmail().withMessage("Invalid email").bail(),
        check("password").notEmpty().withMessage("Password should not be empty").bail()
            .isLength({ min: 7 }).withMessage("Password must be at least 7 characters long").bail()
            .matches("[0-9]").withMessage('Password must contain a number, uppercase and lowercase').bail()
            .matches('[A-Z]').withMessage('Password must contain a number, uppercase and lowercase').bail()
            .matches('[a-z]').withMessage('Password must contain a number, uppercase and lowercase').bail()
    ]
}

const signupValidationRules = () => {
    return [
        check("email")
            .notEmpty().withMessage("Email should not be empty").bail()
            .isEmail().withMessage("Invalid email").bail(),
        check("password").notEmpty().withMessage("Password should not be empty").bail()
            .isLength({ min: 7 }).withMessage("Password must be at least 7 characters long").bail()
            .matches("[0-9]").withMessage('Password must contain a number, uppercase and lowercase').bail()
            .matches('[A-Z]').withMessage('Password must contain a number, uppercase and lowercase').bail()
            .matches('[a-z]').withMessage('Password must contain a number, uppercase and lowercase').bail()
            .custom((val, { req }) => {
                if (val === req.body.confirmPassword) {
                    return true;
                } else {
                    return false
                }
            })
            .withMessage("Passwords do not match"),
        check("identityNumber").notEmpty().withMessage("identity Number should not be empty").bail(),
        check("firstName").notEmpty().withMessage("first name should not be empty").bail(),
        check("middleName").notEmpty().withMessage("middle name should not be empty").bail(),
        check("lastName").notEmpty().withMessage("last name should not be empty").bail(),
        check("dateOfBirth").notEmpty().withMessage("date of birth should not be empty").bail().isDate().withMessage('invalid date'),
        check("address").notEmpty().withMessage("address should not be empty").bail(),
        check("phoneNumber").notEmpty().withMessage("phone number should not be empty").bail(),
        check("parentEmail").notEmpty().withMessage("parent Email should not be empty").bail().isEmail().withMessage("Invalid email").bail(),
        check("parentPhoneNumber").notEmpty().withMessage("parent phone number should not be empty").bail()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    const error = new Error();
    error.message = extractedErrors;
    error.statusCode = 422;
    throw error;
}

const createClassValidationRules = () => {
    return [
        check("className").notEmpty().withMessage("class name should not be empty").bail(),
        check("classGrade").notEmpty().withMessage("class grade should not be empty").bail(),
        check("classRoom.floor").notEmpty().withMessage("class Room floor number should not be empty").bail()
            .isNumeric().withMessage('floor value should be a number'),
        check("classRoom.roomNumber").notEmpty().withMessage("room number should not be empty").bail()
            .isNumeric().withMessage('room number value should be a number'),
        check("capacity").notEmpty().withMessage("capacity should not be empty").bail()
            .isNumeric().withMessage('capacity value should be a number'),
    ]
}

const createCourseValidationRules = () => {
    return [
        check("courseName").notEmpty().withMessage("course name should not be empty").bail(),
        check("courseGrade").notEmpty().withMessage("course grade should not be empty").bail()
    ]
}

module.exports = { loginValidationRules, signupValidationRules, createClassValidationRules, createCourseValidationRules, validate }
