// frontend/src/App.js
import React from 'react';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminDashboard from './pages/AdminDashboard';
import RegisterForm from './components/RegisterForm';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
    </BrowserRouter>

);

export default App;
