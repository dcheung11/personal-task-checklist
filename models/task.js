const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  frequency: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
});

module.exports = mongoose.model("Task", taskSchema);
