import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('/api/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Nuestros Productos</h2>
            <div className="row">
                {productos.map((producto) => (
                    <div key={producto.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src={producto.imagen} alt={producto.nombre} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <p className="fw-bold">Precio: ${producto.precio}</p>
                                <p className={`fw-bold ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
                                    Stock: {producto.stock > 0 ? producto.stock : 'Agotado'}
                                </p>
                                <button className="btn btn-primary w-100">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Landing;
