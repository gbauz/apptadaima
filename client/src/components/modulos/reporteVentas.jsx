import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ReportesVentas() {
  const [salesData, setSalesData] = useState([]);
  const [period, setPeriod] = useState('semanal');
  const [genres, setGenres] = useState(['Shonen', 'Shojo', 'Seinen', 'Josei']);
  const [selectedGenre, setSelectedGenre] = useState('Shonen');
  const [showModal, setShowModal] = useState(false);

  // Datos simulados para las ventas
  const salesByManga = [
    { manga: 'One Piece', sold: 120, ingresos: 2400 },
    { manga: 'Naruto', sold: 95, ingresos: 1900 },
    { manga: 'Dragon Ball', sold: 50, ingresos: 1000 },
  ];

  // Datos simulados para los ingresos por periodo
  const ingresosPorPeriodo = [
    { periodo: 'Semana 1', ingresos: 5000 },
    { periodo: 'Semana 2', ingresos: 6200 },
    { periodo: 'Mes de Octubre', ingresos: 15000 },
    { periodo: '2024', ingresos: 120000 },
  ];

  // Función para mostrar las ventas por manga
  const ventasPorManga = () => {
    setSalesData(salesByManga);
  };

  // Función para mostrar los ingresos por periodo
  const generarReportePorPeriodo = () => {
    setSalesData(ingresosPorPeriodo.filter(item => item.periodo.includes(period)));
  };

  // Función para analizar las tendencias por género
  const analizarTendencias = () => {
    const tendencia = [
      { genero: 'Shonen', popularidad: 'Alta', periodo: 'Diciembre 2024' },
      { genero: 'Shojo', popularidad: 'Media', periodo: 'Diciembre 2024' },
      { genero: 'Seinen', popularidad: 'Baja', periodo: 'Diciembre 2024' },
    ];
    setSalesData(tendencia);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Módulo de Reportes de Ventas de Manga</h1>

      {/* Botones para seleccionar funcionalidad */}
      <div className="mb-4">
        <button className="btn btn-primary me-3" onClick={ventasPorManga}>
          Ventas por Manga
        </button>
        <button className="btn btn-info me-3" onClick={analizarTendencias}>
          Análisis de Tendencias por Género
        </button>
        <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
          Reporte por Periodo
        </button>
      </div>

      {/* Modal para seleccionar el periodo */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccionar Periodo</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <select className="form-select" value={period} onChange={handlePeriodChange}>
                  <option value="semanal">Semana</option>
                  <option value="mensual">Mes</option>
                  <option value="anual">Año</option>
                </select>
                {period === 'mensual' && (
                  <div className="mt-3">
                    <label className="form-label">Seleccionar Género</label>
                    <select className="form-select" value={selectedGenre} onChange={handleGenreChange}>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={generarReportePorPeriodo}
                >
                  Generar Reporte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabla para mostrar los datos */}
      <h2>Reporte de Ventas</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre del Manga</th>
            <th>Cantidad Vendida</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {salesData.length > 0 ? (
            salesData.map((item, index) => (
              <tr key={index}>
                <td>{item.manga || item.genero}</td>
                <td>{item.sold || item.popularidad}</td>
                <td>{item.ingresos || item.periodo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportesVentas;
