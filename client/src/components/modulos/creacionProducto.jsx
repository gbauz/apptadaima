import React, { useState } from "react";
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
    setFormData({
      id: "",
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    });
    setIsEditing(false);
  };

  // Función para hacer el modal arrastrable
  const dragModal = (e) => {
    const modalElement = document.getElementById('modal');
    let offsetX = e.clientX - modalElement.getBoundingClientRect().left;
    let offsetY = e.clientY - modalElement.getBoundingClientRect().top;

    const moveModal = (moveEvent) => {
      const x = moveEvent.clientX - offsetX;
      const y = moveEvent.clientY - offsetY;

      modalElement.style.left = `${x}px`;
      modalElement.style.top = `${y}px`;
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', moveModal);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', moveModal);
    document.addEventListener('mouseup', stopDrag);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Productos - Tienda de Manga</h1>

      <button className="btn btn-primary mb-4" onClick={handleOpenModal}>
        Agregar Producto
      </button>

      {/* Modal para agregar/editar producto */}
      <div
        className={`modal ${showModal ? 'show' : ''}`}
        style={{
          display: showModal ? 'block' : 'none',
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',  // Aumento el ancho del modal a 90%
          zIndex: 1050,  // Para asegurar que el modal esté por encima de otros elementos
          borderRadius: '5px',
          backgroundColor: 'transparent',  // Sin fondo blanco dentro del modal
        }}
        id="modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onMouseDown={dragModal}  // Hacer el modal arrastrable
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: '5px' }}>
            <div className="modal-header" style={{ cursor: 'move', backgroundColor: '#f8f9fa', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
              <h5 className="modal-title" id="exampleModalLabel">
                {isEditing ? "Editar Producto" : "Agregar Producto"}
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
                  <label className="form-label">Nombre del Producto</label>
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

      <h2>Lista de Productos</h2>
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
