import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductoForm() {
  return (
    <div className="container mt-5">
      <h2>Información del Producto</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">Código</label>
          <input type="text" className="form-control" id="codigo" placeholder="Ingrese el código del producto" />
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre del producto" />
        </div>

        <div className="mb-3">
          <label htmlFor="precioUnitario" className="form-label">Precio Unitario</label>
          <input type="number" className="form-control" id="precioUnitario" placeholder="Ingrese el precio unitario" />
        </div>

        <div className="mb-3">
          <label htmlFor="informacionAdicional" className="form-label">Información Adicional</label>
          <textarea className="form-control" id="informacionAdicional" placeholder="Ingrese información adicional"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="tarifaIva" className="form-label">Tarifa IVA</label>
          <select className="form-select" id="tarifaIva">
            <option value="">Seleccione la tarifa IVA</option>
            <option value="0">0%</option>
            <option value="12">12%</option>
            <option value="14">14%</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ice" className="form-label">ICE</label>
          <input type="number" className="form-control" id="ice" placeholder="Ingrese el valor de ICE" />
        </div>

        <div className="mb-3">
          <label htmlFor="codigoIce" className="form-label">Código ICE</label>
          <input type="text" className="form-control" id="codigoIce" placeholder="Ingrese el código ICE" />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcionIce" className="form-label">Descripción ICE</label>
          <textarea className="form-control" id="descripcionIce" placeholder="Ingrese la descripción ICE"></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default ProductoForm;
