import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        toast.success('Welcome to Zumar Law Firm!');
        navigate('/');
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? 'Invalid email or password'
          : 'Connection error. Please try again.');
      toast.error(msg);
      console.error('Login error:', error.response || error);
    }
  };

  const handleGoogleLogin = () => {
    toast.loading('Redirecting to Google...');
    window.location.href = 'http://localhost:5000/auth/google';
  };

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const user = urlParams.get('user');

  if (token && user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    toast.success('Logged in with Google!');
    window.history.replaceState({}, '', '/'); // Clean URL
    navigate('/');  // Redirect to home page
  }
}, [location.search, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-center" />
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-center text-3xl font-bold text-gray-800">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
          >
            Sign in
          </button>

          <div className="flex items-center justify-center my-2">
            <div className="w-full border-t border-gray-300" />
            <span className="px-2 text-sm text-gray-500">Or</span>
            <div className="w-full border-t border-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
