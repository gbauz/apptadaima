import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inicio de sesión enviado');
  };

  return (
    <div style={styles.container}>
      {/* Capa de overlay con color negro opaco */}
      <div style={styles.overlay}></div>

      <div style={styles.loginCard}>
        {/* Imagen tipo logo */}
        <img
          src="/imagenes/logotadaima.jpg" // Reemplaza con la URL de tu logo
          alt="Logo"
          style={styles.logo}
        />
        <h3 style={styles.title}>Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              required
              style={styles.input}
            />
          </div>
          <button
            type="button" // Cambiar a "button" para evitar que el formulario se envíe automáticamente
            style={styles.submitBtn}
            onClick={() => navigate('/menuprincipal')} // Redirección directa
          >
            Iniciar Sesión
          </button>
        </form>
        <div style={styles.forgotPassword}>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

// Estilos internos en el componente
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',  // Centra horizontalmente
    alignItems: 'center',      // Centra verticalmente
    height: '100vh',           // Toma el 100% de la altura de la ventana
    padding: '0 20px',         // Agrega un pequeño padding para móviles
    backgroundImage: 'url(/imagenes/fondomanga.jpg)', // URL de la imagen de fondo
    backgroundSize: 'cover',   // Ajusta la imagen para cubrir todo el contenedor
    backgroundPosition: 'center', // Centra la imagen
    backgroundAttachment: 'fixed', // Hace que la imagen de fondo se quede fija al hacer scroll
    position: 'relative',      // Necesario para colocar el overlay
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color negro con opacidad
    zIndex: 0, // Coloca el overlay por detrás del contenido
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',         // Limita el ancho máximo a 400px
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',       // Centra el texto del título
    position: 'relative',      // Necesario para asegurar que el contenido quede encima del overlay
    zIndex: 1,                 // Asegura que el contenido de la tarjeta esté por encima del overlay
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    marginBottom: '5px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: '10px',
  },
  logo: {
    width: '150px', // Ancho fijo
    height: 'auto', // Alto ajustado automáticamente para mantener proporciones
    marginBottom: '20px',
  },
};

export default Login;
