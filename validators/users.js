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
    },
];

const validatorPassword = [
    check("password_1") 
        .exists()
        .isLength({ min:8, max: 15}).withMessage("Character count: min 8, max 15")
        .trim(),
    check("password_2")
        .custom(async(password_2, {req}) => {
            if(req.body.password_1 !== password_2) {
                throw new Error("Both passwords must be identical")
            }
        }),

    (req, res, next) => {
        const { token } = req.params
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const arrWarnings = errors.array()
            res.render("reset", { arrWarnings, token})
        } else {
            next()
        }
    }
]
module.exports = { validatorCreateUser, validatorLoginUser, validatorPassword}