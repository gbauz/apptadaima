import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PerfilForm() {
  return (
    <div className="container mt-5">
      <h2>Perfil y Firma</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" placeholder="Ingrese su nombre" />
        </div>

        <div className="mb-3">
          <label htmlFor="certificado" className="form-label">Certificado P12</label>
          <input type="file" className="form-control" id="certificado" />
        </div>

        <div className="mb-3">
          <label htmlFor="fechaVigencia" className="form-label">Fecha de Vigencia</label>
          <input type="date" className="form-control" id="fechaVigencia" />
        </div>

        <div className="mb-3">
          <label htmlFor="propietario" className="form-label">Propietario</label>
          <input type="text" className="form-control" id="propietario" placeholder="Propietario del certificado" />
        </div>

        <div className="mb-3">
          <label className="form-label">Categorías</label>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="contribuyenteRimpe" />
            <label className="form-check-label" htmlFor="contribuyenteRimpe">Contribuyente RIMPE</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="negocioPopular" />
            <label className="form-check-label" htmlFor="negocioPopular">Negocio Popular</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="agenteRetencion" />
            <label className="form-check-label" htmlFor="agenteRetencion">Agente de Retención</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default PerfilForm;
