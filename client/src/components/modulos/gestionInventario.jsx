import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movements, setMovements] = useState([]);
  const [formData, setFormData] = useState({
    type: "Entrada", // Tipo por defecto
    product: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0], // Fecha actual por defecto
    reason: "",
  });
  const [filters, setFilters] = useState({
    type: "",
    product: "",
    date: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Abrir y cerrar modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      type: "Entrada",
      product: "",
      quantity: "",
      date: new Date().toISOString().split("T")[0],
      reason: "",
    });
  };

  // Manejar envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setMovements((prev) => [
      ...prev,
      {
        ...formData,
        id: Date.now().toString(),
      },
    ]);
    handleCloseModal();
  };

  // Manejar filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredMovements = movements.filter((movement) => {
    return (
      (!filters.type || movement.type === filters.type) &&
      (!filters.product || movement.product.includes(filters.product)) &&
      (!filters.date || movement.date === filters.date)
    );
  });

  // Modal arrastrable
  const dragModal = (e) => {
    const modalElement = document.getElementById("modal");
    let offsetX = e.clientX - modalElement.getBoundingClientRect().left;
    let offsetY = e.clientY - modalElement.getBoundingClientRect().top;

    const moveModal = (moveEvent) => {
      const x = moveEvent.clientX - offsetX;
      const y = moveEvent.clientY - offsetY;

      modalElement.style.left = `${x}px`;
      modalElement.style.top = `${y}px`;
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", moveModal);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", moveModal);
    document.addEventListener("mouseup", stopDrag);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Inventarios</h1>

      <button className="btn btn-primary mb-4" onClick={handleOpenModal}>
        Registrar Movimiento
      </button>

      {/* Modal para movimientos */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{
          display: showModal ? "block" : "none",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          zIndex: 1050,
          borderRadius: "5px",
        }}
        id="modal"
        tabIndex="-1"
        onMouseDown={dragModal}
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: "5px" }}>
            <div
              className="modal-header"
              style={{
                cursor: "move",
                backgroundColor: "#f8f9fa",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            >
              <h5 className="modal-title">Registrar Movimiento</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                className="modal-body"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <div className="mb-3">
                  <label className="form-label">Tipo de Movimiento</label>
                  <select
                    className="form-control"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.product}
                    onChange={(e) =>
                      setFormData({ ...formData, product: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Motivo</label>
                  <textarea
                    className="form-control"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <h2>Filtros</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Tipo de Movimiento</label>
          <select
            className="form-control"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Producto</label>
          <input
            type="text"
            className="form-control"
            name="product"
            value={filters.product}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-4">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Historial */}
      <h2>Historial de Movimientos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovements.map((movement) => (
            <tr key={movement.id}>
              <td>{movement.type}</td>
              <td>{movement.product}</td>
              <td>{movement.quantity}</td>
              <td>{movement.date}</td>
              <td>{movement.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
