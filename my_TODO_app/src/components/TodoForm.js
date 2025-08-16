
import React, { useState } from 'react';
function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value, dueDate, category);
    setValue('');
    setDueDate('');
    setCategory('General');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '96%', minWidth: 260, fontSize: '1.1em', padding: '12px' }}
      />
      <input
        className="todo-date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        title="Due date"
      />
      <select
        className="todo-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        title="Category"
        style={{ padding: '10px', borderRadius: '8px', border: '2px solid #1976d2', fontSize: '1em' }}
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
        <option value="Study">Study</option>
      </select>
      <button className="todo-add-btn">Add</button>
    </form>
  );
}

export default TodoForm;
