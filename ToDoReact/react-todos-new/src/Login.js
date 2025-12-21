import React, { useState } from 'react';
import service from './service'; // מוודאים שהנתיב ל-service.js נכון
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await service.login(username, password);
            
            localStorage.setItem("token", data.token);
            
            navigate('/tasks'); 
        } catch (err) {
            setError('שם משתמש או סיסמה שגויים');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>התחברות למערכת</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="שם משתמש" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                /><br/><br/>
                <input 
                    type="password" 
                    placeholder="סיסמה" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                /><br/><br/>
                <button type="submit">התחבר</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;