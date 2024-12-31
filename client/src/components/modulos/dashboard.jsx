import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Dropdown, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [user, setUser] = useState({
    name: 'Giovanni Bauz',
    avatar: 'https://via.placeholder.com/40',
  });

  const handleLogout = () => {
    alert('Cerrando sesión...');
    // Lógica de cerrar sesión
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Barra Superior */}
      <Navbar
        bg="light"
        variant="light"
        className="shadow-sm"
        style={{
          background: 'linear-gradient(to right, #4e73df, #1cc88a)', // Gradiente
        }}
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'white', // Color blanco para las letras
            }}
          >
            Sistema Administrativo
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            {/* Imagen y Nombre del Usuario */}
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
                  {user.name} {/* Nombre en blanco */}
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

      {/* Layout Principal */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <div
          style={{
            width: '250px',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #ddd',
            padding: '20px',
          }}
        >
          <Nav className="flex-column">
            <Nav.Link href="#dashboard" className="text-dark">
              Dashboard
            </Nav.Link>
            <Nav.Link href="#users" className="text-dark">
              Usuarios
            </Nav.Link>
            <Nav.Link href="#reports" className="text-dark">
              Reportes
            </Nav.Link>
            <Nav.Link href="#settings" className="text-dark">
              Configuración
            </Nav.Link>
          </Nav>
        </div>

        {/* Contenido Principal */}
        <div className="p-4 flex-grow-1" style={{ backgroundColor: '#fff' }}>
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
