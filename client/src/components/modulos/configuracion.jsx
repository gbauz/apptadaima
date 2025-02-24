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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/user-data", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          const { nombre, correo, rol_id, imagen } = response.data;
          setFormData((prevData) => ({
            ...prevData,
            nombre,
            correo,
            rol: String(rol_id), // Convertir rol_id a string para evitar errores en el <select>
            imagen: imagen || null // Si la imagen existe, la asignamos
          }));
        })
        .catch((error) => console.error("Error al obtener los datos del usuario:", error));
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "imagen") {
      setFormData({ ...formData, imagen: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("correo", formData.correo);

      // Solo enviamos la contraseña si el usuario la modificó
      if (formData.contraseña.trim() !== "") {
        formDataToSend.append("contraseña", formData.contraseña); // Corrección: cambiar de "password" a "contraseña"
      }

      formDataToSend.append("rol", formData.rol);
      if (formData.imagen) {
        formDataToSend.append("imagen", formData.imagen);
      }

      console.log("Enviando datos:", Object.fromEntries(formDataToSend.entries())); // Ver en consola los datos enviados

      const response = await axios.put(
        "http://localhost:3000/api/update-user",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Usuario actualizado:", response.data);
      alert("Datos actualizados correctamente");

      // Si el backend devuelve los datos actualizados, los reflejamos en el estado
      const { nombre, correo, rol_id, imagen } = response.data;
      setFormData((prevData) => ({
        ...prevData,
        nombre,
        correo,
        rol: String(rol_id),
        imagen: imagen || null, // Actualizamos la imagen
      }));
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.response?.data || error.message);
      alert("Hubo un error al actualizar los datos.");
    }
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
          <label className="block text-gray-700">Contraseña (opcional)</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            <option value="1">Admin</option>
            <option value="2">Empleado</option>
            
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
        <button type="submit" className="btn btn-warning btn-sm me-2">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default Configuracion;
