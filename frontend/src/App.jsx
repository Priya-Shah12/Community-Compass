/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FindLost from './pages/FindLost';
import CommunityHelp from './pages/CommunityHelp';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/find-lost" element={<FindLost />} />
            <Route path="/help" element={<CommunityHelp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
