import React, { useEffect, useState } from "react";
import service from "./service.js";
import Auth from "./Auth";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function getTodos() {
    try {
      const data = await service.getTasks();
      setTodos(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  useEffect(() => {
    if (token) {
      getTodos();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTodos([]);
  };

  // אם אין טוקן - מציגים את דף ההתחברות
  if (!token) {
    return <Auth setToken={setToken} />;
  }

  // אם יש טוקן - מציגים את רשימת המשימות
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos <button onClick={handleLogout} style={{ fontSize: "14px", float: "right", margin: "10px", cursor: "pointer" }}>Logout</button></h1>
        <form onSubmit={async (e) => {
          e.preventDefault();
          if (!newTodo.trim()) return;
          await service.addTask(newTodo);
          setNewTodo("");
          getTodos();
        }}>
          <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
            autoFocus 
          />
        </form>
      </header>

      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
              <div className="view">
                <input 
                  className="toggle" 
                  type="checkbox" 
                  checked={todo.isComplete} 
                  onChange={async (e) => {
                    await service.setCompleted(todo.id, e.target.checked, todo.name);
                    getTodos();
                  }} 
                />
                <label>{todo.name}</label>
                <button 
                  className="destroy" 
                  onClick={async () => {
                    await service.deleteTask(todo.id);
                    getTodos();
                  }}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;