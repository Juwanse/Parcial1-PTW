import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRobots } from '../api';

const RobotList = () => {
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getRobots = async () => {
      try {
        const data = await fetchRobots(token);
        setRobots(data);
      } catch (err) {
        setError("Error al cargar los robots.");
      }
    };
    getRobots();
  }, [token]);

  const handleRowClick = (id) => {
    navigate(`/robots/${id}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      
      <header className="text-center p-3">
        <h1>Adopta un Robot con Robot Lovers!</h1>
        
        <img
          src="/image4.png"
          alt="Banner de robots"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </header>

     
      <main className="flex-grow-1 container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="table table-bordered mt-3">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Empresa Fabricante</th>
            </tr>
          </thead>
          <tbody>
            {robots.map((robot) => (
              <tr
                key={robot.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(robot.id)}
              >
                <td>{robot.id}</td>
                <td>{robot.nombre}</td>
                <td>{robot.modelo}</td>
                <td>{robot.empresaFabricante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

    
      <footer className="bg-light text-center p-2">
        <p>Contact us: +57 3102105523 — info@robot-lovers.com — @robot-lovers</p>
      </footer>
    </div>
  );
};

export default RobotList;
