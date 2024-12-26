import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/modulos/login';
import Dashboard from './components/modulos/dashboard';


const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menuprincipal" element={<Dashboard />} />
      
      </Routes>
    </Router>
  );
};



export default App;
