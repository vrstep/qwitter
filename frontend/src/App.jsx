import React, { useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Navigate, BrowserRouter, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Settings from './pages/Settings';
import ProfilePage from './pages/ProfilePage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Welcome />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/settings" Component={Settings} />
        <Route path='/profile' Component={ProfilePage} />
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;