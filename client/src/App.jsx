import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AddServiceDetails from './pages/AddServiceDetails';
import ForgotPassword from './pages/ForgotPassword';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    // Check for token in URL (after Google login)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const message = urlParams.get('message');

    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/');
      toast.success(message || 'Login Successful!');
    }

    // Mark as ready (even if no token in URL, avoids blank page)
    setIsTokenReady(true);
  }, []);

  if (!isTokenReady) return null; // or a spinner/loading if needed

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/add-details/:serviceTitle" element={<AddServiceDetails />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
