import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState(null);
    const [productos, setProductos] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editImagen, setEditImagen] = useState(null);

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('stock', stock);
        if (imagen) formData.append('imagen', imagen);

        try {
            if (editingProduct) {
                // Actualizar producto existente
                const response = await axios.put(`/api/productos/${editingProduct.id}`, formData, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                alert(response.data.message);
            } else {
                // Crear nuevo producto
                const response = await axios.post('/api/productos', formData, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                alert(response.data.message);
            }

            fetchProductos();
            clearForm();
        } catch (error) {
            console.error(error);
            alert('Error al registrar o actualizar el producto');
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await axios.get('/api/productos');
            setProductos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (producto) => {
        setEditingProduct(producto);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setEditImagen(producto.imagen);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/productos/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            alert(response.data.message);
            fetchProductos();
        } catch (error) {
            console.error(error);
            alert('Error al eliminar el producto');
        }
    };

    const clearForm = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setImagen(null);
        setEditingProduct(null);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">{editingProduct ? 'Editar Producto' : 'Registrar Producto'}</h2>
            <div className="card shadow p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Imagen</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {editingProduct ? 'Actualizar Producto' : 'Registrar Producto'}
                    </button>
                    {editingProduct && (
                        <button type="button" className="btn btn-secondary ms-2" onClick={clearForm}>
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <h2 className="text-center mt-4 mb-4">Productos Registrados</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    {producto.imagen && (
                                        <img
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => handleEdit(producto)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegistrarProducto;
