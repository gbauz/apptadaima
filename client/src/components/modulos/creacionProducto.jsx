import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState(null);
    const [productos, setProductos] = useState([]);

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
            const response = await axios.post('/api/productos', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            alert(response.data.message);
            fetchProductos();
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setStock('');
            setImagen(null);
        } catch (error) {
            console.error(error);
            alert('Error al registrar el producto');
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

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Registrar Producto</h2>
            <div className="card shadow p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nombre del producto" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea 
                            className="form-control" 
                            placeholder="Descripción" 
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
                            placeholder="Precio" 
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
                            placeholder="Stock" 
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
                    <button type="submit" className="btn btn-primary w-100">Registrar</button>
                </form>
            </div>

            <h2 className="text-center mt-5">Productos Registrados</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    {producto.imagen ? (
                                        <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" width="50" />
                                    ) : (
                                        'Sin imagen'
                                    )}
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
