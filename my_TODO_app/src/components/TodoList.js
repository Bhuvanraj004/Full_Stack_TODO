import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo, onDragStart, onDragOver, onDrop, draggingIndex }) {
  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {todos.map((todo, index) => (
        <li
          key={index}
          draggable
          onDragStart={() => onDragStart(index)}
          onDragOver={e => { e.preventDefault(); onDragOver(index); }}
          onDrop={() => onDrop(index)}
          style={{
            opacity: draggingIndex === index ? 0.4 : 1,
            listStyle: 'none',
            marginBottom: 0
          }}
        >
          <TodoItem
            index={index}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
