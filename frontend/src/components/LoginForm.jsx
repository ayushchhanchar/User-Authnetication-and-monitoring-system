// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="p-2 border" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border" />
            <button type="submit" className="p-2 bg-blue-500 text-white">Login</button>
        </form>
    );
};

export default LoginForm;
