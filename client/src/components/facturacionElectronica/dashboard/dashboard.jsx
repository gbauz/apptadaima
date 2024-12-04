import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/AdminPanel.css';
/*Screaming Architecture */
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <h2 className="sidebar-title">Panel Administrativo</h2>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className="nav-link" onClick={() => setActiveTab('dashboard')}>
                  Emisión De Factura
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => setActiveTab('users')}>
                  Users
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => setActiveTab('settings')}>
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <header className="header">
            <h1>Admin Dashboard</h1>
          </header>
          <div className="content">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <p>Welcome to the Admin Dashboard!</p>
  </div>
);

const Users = () => (
  <div>
    <h2>Users</h2>
    <p>Manage your users here.</p>
  </div>
);

const Settings = () => (
  <div>
    <h2>Settings</h2>
    <p>Adjust your settings here.</p>
  </div>
);

export default App;
