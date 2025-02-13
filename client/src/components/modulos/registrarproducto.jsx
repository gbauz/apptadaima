import React, { useState } from 'react';
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

    React.useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div>
            <h2>Registrar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                />
                <textarea 
                    placeholder="Descripción" 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Precio" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Stock" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                />
                <input 
                    type="file" 
                    onChange={handleImageChange} 
                />
                <button type="submit">Registrar</button>
            </form>

            <h2>Productos Registrados</h2>
            <table>
                <thead>
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
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td><img src={producto.imagen} alt={producto.nombre} width={50} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistrarProducto;
