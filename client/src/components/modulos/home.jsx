import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Landing from './landing';

const Home = () => {
  return (
    <div>
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#312A77" }}>
  <div className="container">
    <a className="navbar-brand" href="#">
      <img src="/imagenes/logotadaima.jpg" alt="MangaStore Logo" width="60" height="60" />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link  text-white text-light" href="#productos"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16">
  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
  <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
</svg> Nosotros</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white text-light"  href="#productos"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass-fill" viewBox="0 0 16 16">
  <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z"/>
</svg> Misión</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white text-light" href="#mision"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
</svg> Visión</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white text-light" href="#productos"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book-fill" viewBox="0 0 16 16">
  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg> Productos</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white text-light" to="/login"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> Login</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <header className="text-white text-center d-flex flex-column justify-content-center align-items-center" 
        style={{ 
          backgroundImage: "url('/imagenes/manga.jpg')", 
          minHeight: "100vh",
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          position: "relative"
        }}>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <h1 className="fw-bold">Bienvenido a Tadaima Manga Store</h1>
          <p className="lead">Encuentra los mejores mangas al mejor precio</p>
          <a href="#productos" className="btn btn-primary mt-3">Ver Catálogo</a>
        </div>
        <div style={{ 
            position: "absolute", 
            top: 0, left: 0, width: "100%", height: "100%", 
            backgroundColor: "rgba(0, 0, 0, 0.5)" 
          }}></div>
      </header>
  {/* Quiénes Somos */}
  <section id="quienes-somos" className="container my-5">
  <div className="row" style={{ display: "flex", alignItems: "center" }}>
    
    <div className="col-md-6">
      <h2 className="text-left mb-4" style={{ fontSize: "80px" }}>Nosotros</h2>
      <div style={{ borderBottom: "5px solid #9b59b6", width: "40%", marginBottom: "20px" }}></div>
      <p className="text-left">Tadaima mangastore es una tienda dedicada a ofrecer los mejores mangas del mercado, con una selección exclusiva para los amantes del anime y la cultura japonesa.</p>
    </div>

    <div className="col-md-6 d-flex justify-content-center">
      <img 
        src="/imagenes/stand.jpg" 
        alt="Imagen de MangaStore" 
        style={{ width: "400px", height: "400px", borderRadius: "8px" }} 
      />
    </div>
  </div>
</section>


      {/* Misión y Visión */}
      <section id="mision-vision" className="container my-5">
        <div className="row">
          {/* Misión */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
              <div className="card-body">
                <h3 className="card-title text-center" style={{ color: "#312A77" }}>Misión</h3>
                <p className="card-text">Nuestra misión es ofrecer mangas de alta calidad, ofreciendo una experiencia única para los amantes del anime y la cultura japonesa, con el compromiso de satisfacer las necesidades de nuestros clientes.</p>
              </div>
            </div>
          </div>

          {/* Visión */}
          <div className="col-md-6">
            <div className="card shadow-lg" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
              <div className="card-body">
                <h3 className="card-title text-center" style={{ color: "#312A77" }}>Visión</h3>
                <p className="card-text">Ser la tienda de mangas líder en la región, expandiendo nuestra oferta de productos y creando una comunidad sólida que comparta el amor por la cultura japonesa y anime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="container my-5">
        <Landing />
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3" id="contacto">
        <p>Contacto: contacto@mangastore.com | Tel: +123 456 789</p>
        <p>Síguenos en nuestras redes sociales</p>
      </footer>
    </div>
  );
};

export default Home;
