import React, { useState } from 'react';
import service from './service';

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await service.login(username, password);
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        await service.register(username, password);
        alert("ההרשמה הצליחה! עכשיו אפשר להתחבר");
        setIsLogin(true);
      }
    } catch (err) {
      alert("שגיאה! בדקו את הפרטים ונסו שוב");
    }
  };

  return (
    <div className="todoapp" style={{ padding: "40px", textAlign: "center", maxWidth: "400px", margin: "100px auto", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <input 
          style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}
          placeholder="Username" 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button style={{ width: "100%", padding: "10px", cursor: "pointer", backgroundColor: "#af2f2f", color: "white", border: "none" }}>
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>
      <p style={{ marginTop: "20px", cursor: "pointer", color: "#777", textDecoration: "underline" }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default Auth;