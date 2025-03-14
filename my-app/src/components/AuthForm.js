import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; 

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/robots');
    } catch (err) {
      setError('Credenciales incorrectas. Intente nuevamente.');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div className="auth-container d-flex flex-column min-vh-100">
      <header className="text-center p-3">
        <h1>Adopta un Robot con Robot Lovers!</h1>
        <img
          src="/image4.png"
          alt="Banner de robots"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </header>

      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <div 
          className="p-4" 
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <h2 className="text-center mb-4">Inicio de sesión</h2>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label 
                htmlFor="username" 
                className="form-label fw-bold"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                style={{
                  backgroundColor: '#D9D9D9',
                  border: 'none',
                  borderRadius: '4px',
                  height: '2.5rem',
                }}
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label 
                htmlFor="password" 
                className="form-label fw-bold"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                style={{
                  backgroundColor: '#D9D9D9',
                  border: 'none',
                  borderRadius: '4px',
                  height: '2.5rem',
                }}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn me-3"
                style={{ 
                  backgroundColor: '#073DA2', 
                  color: '#fff',
                  width: '6rem'
                }}
              >
                Ingresar
              </button>
              <button
                type="button"
                className="btn"
                style={{ 
                  backgroundColor: '#F15855', 
                  color: '#fff',
                  width: '6rem'
                }}
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="text-center p-2">
        <p>Contact us: +57 3102105523 — info@robot-lovers.com — @robot-lovers</p>
      </footer>
    </div>
  );
};

export default AuthForm;
