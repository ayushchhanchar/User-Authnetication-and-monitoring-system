// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/auth/log');
                setLogs(data);
            } catch (error) {
                console.error('Failed to fetch logs:', error);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Login Activity Logs</h2>
            <ul>
                {logs.map(log => (
                    <li key={log._id} className="border-b p-2 bg-slate-300  mb-10">
                        <h1>Username: <span>{log.userId.username}</span></h1>
                        <h2>IpAddress: <span>{log.ipAddress}</span></h2>  
                        <h2>Device: <span>{log.device}</span></h2>
                        <h2>Time: <span>{new Date(log.loginTime).toLocaleString()}</span></h2>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default AdminDashboard;
