const {check, validationResult } = require("express-validator");

const validatorPost = [
    check("propiedad")
        .trim()
        .isLength({min: 2, max: 20 })
        .withMessage("Character count min 15; max 60"),
    
    check("descripcion")
        .trim()
        .isLength({min: 20, max:200})
        .withMessage("Character count min 20; max 200"),
    
    check("precio")
        .trim()
        .isNumeric()
        .withMessage("Only Numbers"),
    
    check("tipo")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please complete type"),

    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() })

        } else {
            next()
        }
    }


]

module.exports = { validatorPost}