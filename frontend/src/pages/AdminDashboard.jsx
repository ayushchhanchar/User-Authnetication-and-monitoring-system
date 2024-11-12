// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const { data } = await api.get('/auth/logs');
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
                    <li key={log._id} className="border-b p-2">
                        {log.userId}: {log.ipAddress} - {log.device} at {new Date(log.loginTime).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
