import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRobotDetail } from '../api';
import { translations } from '../translations';

const RobotDetail = ({ id, lang }) => {
  const { id: routeId } = useParams();
  const effectiveId = id || routeId;

  const [robot, setRobot] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getRobotDetail = async () => {
      try {
        const data = await fetchRobotDetail(effectiveId, token);
        setRobot(data);
      } catch (err) {
        setError("Error al cargar el detalle del robot.");
      }
    };
    getRobotDetail();
  }, [effectiveId, token]);

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (!robot) {
    return <div className="mt-3">Cargando...</div>;
  }

  const t = (path) => {
    const parts = path.split('.');
    let val = translations[lang];
    for (let p of parts) {
      val = val[p];
    }
    return val;
  };

  return (
    <div 
      className="p-3" 
      style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        boxShadow: '0 0 6px rgba(0,0,0,0.1)',
        maxWidth: '300px'
      }}
    >
      <h5 className="text-center mb-3">{robot.nombre}</h5>

      <div className="text-center">
        <img
          src="/image.png"
          alt="Robot por defecto"
          style={{ width: '120px', height: 'auto' }}
        />
      </div>

      <div className="mt-3" style={{ fontSize: '0.9rem' }}>
        <p className="mb-1">
          <strong>{'>'} {t('detail.year')}:</strong> {robot.añoFabricacion}
        </p>
        <p className="mb-1">
          <strong>{'>'} {t('detail.capacidad')}:</strong> {robot.capacidadProcesamiento}
        </p>
        <p className="mb-1">
          <strong>{'>'} {t('detail.humor')}:</strong> {robot.humor}
        </p>
        <p className="mb-0">
          <strong>{'>'} {t('detail.caracteristicas')}:</strong>
        </p>
      </div>
    </div>
  );
};

export default RobotDetail;
