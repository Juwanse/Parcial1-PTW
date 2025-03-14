// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import RobotList from './components/RobotList';
import RobotDetail from './components/RobotDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/robots" element={<RobotList />} />
        <Route path="/robots/:id" element={<RobotDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
