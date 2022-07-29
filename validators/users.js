const {check, validationResult } = require("express-validator");

const validatorCreateUser = [
    check("name")
        .exists().withMessage("Name is required")
        .trim()
        .isAlpha('es-ES', {ignore: ' '}).withMessage("Only letters")
        .notEmpty().withMessage("Name must no be empty")
        .isLength({min: 2, max: 80}).withMessage("Character count min: 2, max: 80"),
    check("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email adress")
        .normalizeEmail(),
    check("password")
        .exists().withMessage("Password is required")
        .isLength({min: 8}).withMessage("Must be at least 8 characters long")
        .trim(),
    
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errores: errors.array() })
        } else {
            next()
        }

    },
]

const validatorLoginUser = [
    check("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),

    check("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8})
        .trim(),

        (req, res, next) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({errores: errors.array() })
            } else {
                next()
            }
    }
];


//

module.exports = { validatorCreateUser, validatorLoginUser}