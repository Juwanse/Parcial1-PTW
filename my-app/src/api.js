
const API_BASE = "http://localhost:3001";

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: username, password }),
  });
  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }
  return response.json(); 
};

export const fetchRobots = async (token) => {
  const response = await fetch(`${API_BASE}/robots`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los robots");
  }
  return response.json();
};

export const fetchRobotDetail = async (id, token) => {
  const response = await fetch(`${API_BASE}/robots/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener el detalle del robot");
  }
  return response.json();
};
