import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdquirienteForm() {
  return (
    <div className="container mt-5">
      <h2>Información del Adquiriente</h2>
      <form>
        {/* Establecimiento */}
        <div className="mb-3">
          <label htmlFor="establecimiento" className="form-label">Establecimiento</label>
          <select className="form-select" id="establecimiento">
            <option value="001">001</option>
          </select>
        </div>

        {/* Adquiriente */}
        <h3 className="mt-4">Adquiriente</h3>

        <div className="mb-3">
          <label htmlFor="identificacion" className="form-label">Identificación</label>
          <input type="text" className="form-control" id="identificacion" placeholder="Ingrese la identificación" />
        </div>

        <div className="mb-3">
          <label htmlFor="tipoIdentificacion" className="form-label">Tipo de Identificación</label>
          <select className="form-select" id="tipoIdentificacion">
            <option value="">Seleccione el tipo de identificación</option>
            <option value="cedula">Cédula</option>
            <option value="ruc">RUC</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" placeholder="Ingrese la dirección" />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input type="text" className="form-control" id="telefono" placeholder="Ingrese el teléfono" />
        </div>

        <div className="mb-3">
          <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" id="correoElectronico" placeholder="Ingrese el correo electrónico" />
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default AdquirienteForm;
