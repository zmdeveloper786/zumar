import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/${type}`;
    try {
      const res = await axios.post(url, formData, { withCredentials: true });
      toast.success(res.data.message || 'Success!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

 const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {type === 'login' ? 'Login' : 'Sign Up'}
        </button>
        <div className="my-4 text-center text-sm text-gray-500">OR</div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
