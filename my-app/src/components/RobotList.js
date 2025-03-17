import React, { useEffect, useState } from 'react';
import { fetchRobots } from '../api';
import RobotDetail from './RobotDetail';
import { translations } from '../translations'; 

const RobotList = () => {
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState("");
  const [selectedRobotId, setSelectedRobotId] = useState(null);


  const [lang, setLang] = useState(localStorage.getItem('lang') || 'es');

  const token = localStorage.getItem("token");


  const t = (path) => {

    const parts = path.split('.');
    let val = translations[lang];
    for (let p of parts) {
      val = val[p];
    }
    return val;
  };


  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);


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
    setSelectedRobotId(id);
  };


  const toggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
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

        <div className="mt-2">
          <button onClick={toggleLang} className="btn btn-sm btn-primary">
            {lang === 'es' ? 'Switch to EN' : 'Cambiar a ES'}
          </button>
        </div>
      </header>

      <main className="flex-grow-1 container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}

  
        <h2 className="text-center mb-4">{t('listTitle')}</h2>

        <div className="row">
 
          <div className="col-md-6">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>

                  <th>{t('tableHeader.id')}</th>
                  <th>{t('tableHeader.nombre')}</th>
                  <th>{t('tableHeader.modelo')}</th>
                  <th>{t('tableHeader.empresa')}</th>
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
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center">
            {selectedRobotId ? (
              <RobotDetail id={selectedRobotId} lang={lang} />
            ) : (
              <p>{t('detailMessage')}</p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-light text-center p-2">
        <p>Contact us: +57 3102105523 — info@robot-lovers.com — @robot-lovers</p>
      </footer>
    </div>
  );
};

export default RobotList;
