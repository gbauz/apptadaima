import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertStockLow, setAlertStockLow] = useState(false);

  // Verificar si algún producto tiene stock bajo
  useEffect(() => {
    products.forEach((product) => {
      if (product.stock < 5) {
        setAlertStockLow(true);
      }
    });
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === formData.id ? { ...formData } : product
        )
      );
      setIsEditing(false);
    } else {
      setProducts((prev) => [
        ...prev,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    resetForm();
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Restablecer el formulario
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    });
    setShowModal(false);
  };

  // Ajustes manuales de inventario (entradas y salidas)
  const handleStockChange = (id, change) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, stock: parseInt(product.stock) + change }
          : product
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Inventario - Tienda de Manga</h1>

      <button className="btn btn-primary mb-4" onClick={handleOpenModal}>
        Agregar Manga
      </button>

      {/* Modal para agregar/editar manga */}
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
        }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: '5px' }}>
            <div className="modal-header" style={{ cursor: 'move', backgroundColor: '#f8f9fa' }}>
              <h5 className="modal-title" id="exampleModalLabel">
                {isEditing ? "Editar Manga" : "Agregar Manga"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre del Manga</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Precio Unitario</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock Disponible</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Alerta de stock bajo */}
      {alertStockLow && (
        <div className="alert alert-warning" role="alert">
          ¡Alerta! Algunos mangas tienen stock bajo. ¡Revísalos!
        </div>
      )}

      <h2>Lista de Mangas</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleStockChange(product.id, 1)} // Entrada de stock
                >
                  Entrada
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleStockChange(product.id, -1)} // Salida de stock
                >
                  Salida
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
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
