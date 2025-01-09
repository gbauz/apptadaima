import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Dropdown, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreacionProducto from './creacionProducto'; 
import ProveedorMangas from './proveedorMangas';

function Dashboard() {
  const [user, setUser] = useState({
    name: 'Giovanni Bauz',
    avatar: 'https://via.placeholder.com/40',
    rol_id: 1, // Default to admin (this should be fetched from the backend)
  });

  const [selectedOption, setSelectedOption] = useState('dashboard');

  const handleLogout = () => {
    alert('Cerrando sesión...');
    localStorage.removeItem('token');
    // Lógica de cerrar sesión
  };

  // Obtener el rol desde localStorage o desde la API
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Función para renderizar contenido dinámico en el panel derecho
  const renderContent = () => {
    if (user.rol_id === 1) {
      // Administrador
      switch (selectedOption) {
        case 'dashboard':
          return (
            <>
              <h2 className="mb-4" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                Bienvenido, {user.name}
              </h2>
              <Row>
                <Col md={4}>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h5>Usuarios</h5>
                      <p className="display-4">123</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h5>Reportes</h5>
                      <p className="display-4">45</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h5>Ventas</h5>
                      <p className="display-4">$12,345</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          );
        case 'users':
          return <CreacionProducto />;
        case 'proveedormanga':
          return <ProveedorMangas />;
        case 'settings':
          return <h2>Sección de Configuración</h2>;
        default:
          return <h2>Bienvenido al Sistema Administrativo</h2>;
      }
    } else if (user.rol_id === 2) {
      // Empleado
      switch (selectedOption) {
        case 'dashboard':
          return (
            <>
              <h2 className="mb-4" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                Bienvenido, {user.name}
              </h2>
              <Row>
                <Col md={4}>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h5>Ventas</h5>
                      <p className="display-4">$5,000</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          );
        case 'proveedormanga':
          return <ProveedorMangas />;
        case 'settings':
          return <h2>Sección de Configuración</h2>;
        default:
          return <h2>Bienvenido al Sistema de Empleado</h2>;
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        bg="light"
        variant="light"
        className="shadow-sm"
        style={{
          background: 'linear-gradient(to right, #4e73df, #1cc88a)',
        }}
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'white',
            }}
          >
            Sistema Administrativo
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={user.avatar}
                  roundedCircle
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                  alt="User Avatar"
                />
                <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'white' }}>
                  {user.name}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#profile">Ver Perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div
          style={{
            width: '250px',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #ddd',
            padding: '20px',
          }}
        >
          <Nav className="flex-column">
            <Nav.Link onClick={() => setSelectedOption('dashboard')} className="text-dark">
              Dashboard
            </Nav.Link>
            {user.rol_id === 1 && (
              <>
                <Nav.Link onClick={() => setSelectedOption('users')} className="text-dark">
                  Registrar productos
                </Nav.Link>
              </>
            )}
            <Nav.Link onClick={() => setSelectedOption('proveedormanga')} className="text-dark">
              Registrar Proveedores
            </Nav.Link>
            <Nav.Link onClick={() => setSelectedOption('settings')} className="text-dark">
              Configuración
            </Nav.Link>
          </Nav>
        </div>

        <div className="p-4 flex-grow-1" style={{ backgroundColor: '#fff' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
