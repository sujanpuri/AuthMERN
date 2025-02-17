const User = require("../Models/user");

const user = async(req, res)=>{
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({status: false, message: "User not Found"})
    res.json({status: true, name: user.name, email:user.email, pw:user.password});    //you have to write here what ever you want to fetch the data from the db 
}

module.exports = {user}