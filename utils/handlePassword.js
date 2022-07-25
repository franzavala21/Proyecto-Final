const bcrypt = require("bcrypt");
const saltRounds = 10

const hashPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password)
    return hashedPassword
}

const checkPass = async(originalPass, hashedPass) => {
    const passMatch = await bcrypt.compare(originalPass, hashedPass)
    return passMatch
}

module.exports = { hashPassword, checkPass}