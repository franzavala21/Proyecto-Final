const notNumber = ((id, res) => {
    if(isNaN(Number(id))){
        res.status(400).json({message: "ID must be a positive number"})
        return true
    }else{
        return false
    }

});

module.exports = notNumber