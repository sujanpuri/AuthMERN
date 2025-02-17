const User = require("../Models/user");

const user = async (req, res) => {
  // Find User by ID. (in DB)
  const user = await User.findById(req.user.userId);
  if (!user)
    return res.json({ status: false, message: "User not Found" });
  res.json({
    status: true,
    name: user.name,
    email: user.email,
  }); // Extract everything user data from the DB and save in the res.json() which can be used in the "/page".
};

module.exports = { user };