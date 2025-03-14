
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token || "dummy-token");
      navigate("/robots");
    } catch (err) {
      setError("Credenciales incorrectas.");
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 me-2">
          Ingresar
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
