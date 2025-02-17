const mongoose = require('mongoose');
// User Schema
const adminSchema = new mongoose.Schema({
  email: String,
});
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;