const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // NEW
  text: { type: String, required: true },
  dueDate: { type: String },
  category: { type: String, default: 'General' },
  completed: { type: Boolean, default: false },
  subtasks: [subtaskSchema]
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;

