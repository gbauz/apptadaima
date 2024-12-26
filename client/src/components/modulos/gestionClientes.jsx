import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    preferredGenres: [],
    purchaseHistory: [],
    receiveNotifications: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === formData.id ? { ...formData } : client
        )
      );
      setIsEditing(false);
    } else {
      setClients((prev) => [
        ...prev,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    setFormData({
      id: "",
      name: "",
      email: "",
      preferredGenres: [],
      purchaseHistory: [],
      receiveNotifications: false,
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  };

  const handleEdit = (client) => {
    setFormData(client);
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
      email: "",
      preferredGenres: [],
      purchaseHistory: [],
      receiveNotifications: false,
    });
    setIsEditing(false);
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const preferredGenres = prev.preferredGenres.includes(value)
        ? prev.preferredGenres.filter((genre) => genre !== value)
        : [...prev.preferredGenres, value];
      return { ...prev, preferredGenres };
    });
  };

  const handleNotificationChange = (e) => {
    setFormData((prev) => ({ ...prev, receiveNotifications: e.target.checked }));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Clientes - Tienda de Manga</h1>

      <button className="btn btn-primary mb-4" onClick={handleOpenModal}>
        Registrar Cliente
      </button>

      {/* Modal para agregar/editar cliente */}
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
                {isEditing ? "Editar Cliente" : "Registrar Cliente"}
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
                  <label className="form-label">Nombre del Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Géneros Preferidos</label>
                  <div>
                    {["Acción", "Aventura", "Romántico", "Horror", "Ciencia Ficción"].map((genre) => (
                      <div key={genre} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={genre}
                          checked={formData.preferredGenres.includes(genre)}
                          onChange={handleGenreChange}
                        />
                        <label className="form-check-label">{genre}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Historial de Compras</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.purchaseHistory.join(", ")}
                    onChange={(e) =>
                      setFormData({ ...formData, purchaseHistory: e.target.value.split(", ") })
                    }
                    placeholder="Ingrese los mangas comprados separados por coma"
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.receiveNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label className="form-check-label">
                      ¿Desea recibir notificaciones sobre nuevos lanzamientos?
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Actualizar" : "Registrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <h2>Lista de Clientes</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Géneros Preferidos</th>
            <th>Historial de Compras</th>
            <th>Recibir Notificaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.preferredGenres.join(", ")}</td>
              <td>{client.purchaseHistory.join(", ")}</td>
              <td>{client.receiveNotifications ? "Sí" : "No"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(client)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(client.id)}
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
