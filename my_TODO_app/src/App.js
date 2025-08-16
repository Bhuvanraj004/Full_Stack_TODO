import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import API_BASE from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [listening, setListening] = useState(false);

  // AUTH
  const token = localStorage.getItem('token');
  const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/todos`, { headers: { ...authHeader } });
      if (res.status === 401) { window.location.href = '/login'; return; }
      const data = await res.json();
      setTodos(data || []);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => { 
    if (!token) { window.location.href = '/login'; return; }
    fetchTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add todo (POST)
  const addTodo = async (text, dueDate, category, subtasks = []) => {
    const newTodo = { text, dueDate, category, completed: false, subtasks };
    const res = await fetch(`${API_BASE}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(newTodo)
    });
    if (res.status === 401) { window.location.href = '/login'; return; }
    const savedTodo = await res.json();
    setTodos([...todos, savedTodo]);
  };

  // Toggle todo (PUT)
  const toggleTodo = async (index) => {
    const todo = todos[index];
    const updated = { ...todo, completed: !todo.completed };
    const res = await fetch(`${API_BASE}/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(updated)
    });
    if (res.status === 401) { window.location.href = '/login'; return; }
    const updatedTodo = await res.json();
    const newTodos = [...todos];
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
  };

  // Delete todo (DELETE)
  const deleteTodo = async (index) => {
    const todo = todos[index];
    const res = await fetch(`${API_BASE}/api/todos/${todo._id}`, {
      method: 'DELETE',
      headers: { ...authHeader }
    });
    if (res.status === 401) { window.location.href = '/login'; return; }
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Voice input logic (unchanged)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      addTodo(transcript, '', 'General');
      setListening(false);
    };
    recognition.onerror = () => { setListening(false); };
    recognition.onend = () => { setListening(false); };
  };

  // (optional) remove localStorage syncing of todos to avoid user mixing
  // — keeping your previous code removed for clarity

  const handleThemeToggle = () => {
    setDarkTheme((prev) => {
      const newTheme = !prev;
      if (newTheme) document.body.classList.add('dark-theme');
      else document.body.classList.remove('dark-theme');
      return newTheme;
    });
  };

  const handleDragStart = (index) => setDraggingIndex(index);
  const handleDragOver = () => {};
  const handleDrop = (index) => {
    if (draggingIndex === null || draggingIndex === index) return;
    const newTodos = [...todos];
    const [removed] = newTodos.splice(draggingIndex, 1);
    newTodos.splice(index, 0, removed);
    setTodos(newTodos);
    setDraggingIndex(null);
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="app">
      <button className="theme-toggle-btn" onClick={handleThemeToggle}
        style={{ position: 'absolute', top: 20, right: 120 }} aria-label="Toggle theme">
        {darkTheme ? '🌙 Dark' : '☀️ Light'}
      </button>

      <button className="theme-toggle-btn" onClick={logout}
        style={{ position: 'absolute', top: 20, right: 30 }} aria-label="Logout">
        Logout
      </button>

      <h1>My To-Do List</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          type="text" placeholder="Search tasks..." value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '96%', minWidth: 200, fontSize: '1.1em', padding: '10px',
            margin: '10px 0 20px 0', border: '2px solid #1976d2', borderRadius: 8
          }}
        />
        <button onClick={handleVoiceInput}
          style={{
            background: listening ? '#1976d2' : '#eee', color: listening ? 'white' : '#1976d2',
            border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: listening ? '0 0 8px #1976d2' : 'none', cursor: 'pointer', transition: 'all 0.2s'
          }}
          title={listening ? 'Listening...' : 'Add task by voice'}
        >
          <span style={{ fontSize: 22 }}>{listening ? '🎤' : '🎙️'}</span>
        </button>
      </div>

      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        draggingIndex={draggingIndex}
      />
    </div>
  );
}

export default App;
