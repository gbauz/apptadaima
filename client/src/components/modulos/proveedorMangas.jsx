import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact: "",
    paymentDetails: "",
    restockOrders: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setSuppliers((prev) =>
        prev.map((supplier) =>
          supplier.id === formData.id ? { ...formData } : supplier
        )
      );
      setIsEditing(false);
    } else {
      setSuppliers((prev) => [
        ...prev,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    setFormData({
      id: "",
      name: "",
      contact: "",
      paymentDetails: "",
      restockOrders: [],
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
  };

  const handleEdit = (supplier) => {
    setFormData(supplier);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      name: "",
      contact: "",
      paymentDetails: "",
      restockOrders: [],
    });
    setIsEditing(false);
  };

  const handleOrderChange = (e) => {
    const order = e.target.value;
    setFormData((prev) => ({
      ...prev,
      restockOrders: prev.restockOrders.includes(order)
        ? prev.restockOrders.filter((o) => o !== order)
        : [...prev.restockOrders, order],
    }));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Proveedores de Mangas</h1>

      <button className="btn btn-primary mb-4" onClick={handleOpenModal}>
        Añadir Proveedor
      </button>

      {/* Modal para añadir/editar proveedor */}
      <div
        className={`modal ${showModal ? 'show' : ''}`}
        style={{
          display: showModal ? 'block' : 'none',
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          zIndex: 1050,
          borderRadius: '5px',
          backgroundColor: 'transparent',
        }}
        id="modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onMouseDown={(e) => dragModal(e)}  // Hacer el modal arrastrable
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: '5px' }}>
            <div className="modal-header" style={{ cursor: 'move', backgroundColor: '#f8f9fa', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
              <h5 className="modal-title" id="exampleModalLabel">
                {isEditing ? "Editar Proveedor" : "Añadir Proveedor"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="mb-3">
                  <label className="form-label">Nombre del Proveedor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Detalles de Pago</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.paymentDetails}
                    onChange={(e) => setFormData({ ...formData, paymentDetails: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pedidos de Reabastecimiento</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.restockOrders.join(", ")}
                    onChange={(e) =>
                      setFormData({ ...formData, restockOrders: e.target.value.split(", ") })
                    }
                    placeholder="Ingrese pedidos de mangas separados por coma"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Actualizar" : "Añadir"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <h2>Lista de Proveedores</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Detalles de Pago</th>
            <th>Pedidos de Reabastecimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.paymentDetails}</td>
              <td>{supplier.restockOrders.join(", ")}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(supplier)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(supplier.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
