import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/modulos/login';
import Dashboard from './components/modulos/dashboard';
import Home from './components/modulos/home';
import RegistroCliente from './components/modulos/registroCliente';
import Landing from './components/modulos/landing';

const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menuprincipal" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/registro" element={<RegistroCliente />} />
      </Routes>
    </Router>
  );
};



export default App;
