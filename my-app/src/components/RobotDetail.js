
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRobotDetail } from '../api';

const RobotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [robot, setRobot] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getRobotDetail = async () => {
      try {
        const data = await fetchRobotDetail(id, token);
        setRobot(data);
      } catch (err) {
        setError("Error al cargar el detalle del robot.");
      }
    };
    getRobotDetail();
  }, [id, token]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!robot) {
    return <div className="container mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Detalle de {robot.nombre}</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <img
            src={robot.imagen}
            alt={robot.nombre}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Modelo:</strong> {robot.modelo}
            </li>
            <li className="list-group-item">
              <strong>Empresa Fabricante:</strong> {robot.empresaFabricante}
            </li>
            <li className="list-group-item">
              <strong>Año de fabricación:</strong> {robot.añoFabricacion}
            </li>
            <li className="list-group-item">
              <strong>Capacidad de procesamiento:</strong> {robot.capacidadProcesamiento}
            </li>
            <li className="list-group-item">
              <strong>Humor:</strong> {robot.humor}
            </li>
          </ul>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default RobotDetail;
