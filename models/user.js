const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
  // name: { type: String, required: true },

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 4 },
  tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Task'}],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
