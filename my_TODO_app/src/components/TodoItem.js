
import React from 'react';


function TodoItem({ todo, index, toggleTodo, deleteTodo }) {
  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString());
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}${isOverdue ? ' overdue' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: 6, border: '2px solid #1976d2', borderRadius: 16, padding: 18, marginBottom: 18, background: '#fff', boxShadow: '0 2px 8px #e3f2fd' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <span style={{ flex: 1, color: todo.completed ? '#aaa' : isOverdue ? '#d32f2f' : '#222', fontWeight: 500, fontSize: '1.1em', letterSpacing: '0.5px' }}>
          {todo.text}
          {todo.category && (
            <span className="todo-category-tag" style={{ marginLeft: 8, padding: '2px 10px', borderRadius: '12px', background: '#e3f2fd', color: '#1976d2', fontSize: '0.85em', fontWeight: 600 }}>{todo.category}</span>
          )}
          {todo.dueDate && (
            <span style={{ display: 'block', fontSize: '0.9em', marginTop: 4, color: isOverdue ? '#d32f2f' : '#1976d2', fontWeight: 400 }}>
              Due: {todo.dueDate} {isOverdue && <strong>(Overdue)</strong>}
            </span>
          )}
        </span>
        <button
          className="todo-btn complete-btn"
          title="Mark as completed"
          onClick={() => toggleTodo(index)}
          aria-label="Complete"
        >✓</button>
        <button
          className="todo-btn delete-btn"
          title="Delete"
          onClick={() => deleteTodo(index)}
          aria-label="Delete"
        >🗑️</button>
      </div>
      {/* Subtasks feature removed */}
    </li>
  );
}

export default TodoItem;
