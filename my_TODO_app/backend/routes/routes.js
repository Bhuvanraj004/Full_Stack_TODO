const express = require('express');
const router = express.Router();
const Todo = require('../model/db');
const auth = require('../middleware/authMiddleware');

// Get all todos for logged-in user
router.get('/todos', auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(todos);
});

// Create a new todo (attach userId)
router.post('/todos', auth, async (req, res) => {
  const todo = new Todo({ ...req.body, userId: req.user.id });
  await todo.save();
  res.json(todo);
});

// Update a todo (only if it belongs to user)
router.put('/todos/:id', auth, async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

// Delete a todo (only if it belongs to user)
router.delete('/todos/:id', auth, async (req, res) => {
  const deleted = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
});

module.exports = router;
