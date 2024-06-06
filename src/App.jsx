import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Register, Home } from './Pages';
import { db, app, analytics, auth } from './firebase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;