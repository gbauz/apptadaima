import React, { useState, useEffect } from "react";
import axios from "axios";

const Configuracion = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "",
    imagen: null
  });

  // Obtener los datos del usuario desde el backend
  useEffect(() => {
    const token = localStorage.getItem("token"); // Asumiendo que el token está en el localStorage

    if (token) {
      axios
        .get("http://localhost:3000/api/user-data", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          const { nombre, correo, rol_id } = response.data;
          setFormData((prevData) => ({
            ...prevData,
            nombre,
            correo,
            rol: rol_id // Esto debe coincidir con el rol_id retornado desde el backend
          }));
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    } else {
      console.log("No se encontró token en localStorage");
    }
  }, []); // Este useEffect solo se ejecutará una vez, cuando el componente se monte.

  const handleChange = (e) => {
    if (e.target.name === "imagen") {
      setFormData({ ...formData, imagen: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token no encontrado.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("correo", formData.correo);
    formDataToSend.append("contraseña", formData.contraseña);
    formDataToSend.append("rol", formData.rol);
    if (formData.imagen) {
      formDataToSend.append("imagen", formData.imagen);
    }

    axios
      .put("http://localhost:3000/api/update-user", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log("Usuario actualizado:", response.data);
        // Aquí puedes agregar un mensaje de éxito o redireccionar a otro componente si es necesario.
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
        // Aquí puedes agregar un mensaje de error si lo deseas.
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Configuración de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione un rol</option>
            <option value="1">Administrador</option>
            <option value="2">Docente</option>
            <option value="3">Secretaria</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Imagen</label>
          <input
            type="file"
            name="imagen"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="btn btn-warning btn-sm me-2"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default Configuracion;
