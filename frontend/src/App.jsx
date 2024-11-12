// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminDashboard from './pages/AdminDashboard';

const App = () => (
    <Router>
        <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/admin" component={AdminDashboard} />
        </Switch>
    </Router>
);

export default App;
