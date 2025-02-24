import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistroCliente = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    console.log('Cliente registrado', { name, email, password });
    setError(''); // Limpiar el error si el formulario es válido
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h1 className="text-center mb-4">Registrate</h1>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese su nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;