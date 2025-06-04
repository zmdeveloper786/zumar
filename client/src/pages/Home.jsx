import React from 'react';
import { useNavigate } from 'react-router-dom';
import Services from '../components/Services'; // Adjust the import path as necessary

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="container-fluid mx-auto px-4 py-8">
        <div className="flex justify-between mx-8 items-center mb-8">
          <div>
            <h2 className="text-[#57123f] text-center text-xl font-bold mb-2">
              Welcome to Zumar Law Firm
            </h2>
            <p className="text-gray-600 text-center text-lg">Select your Services</p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="bg-[#57123f] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all text-sm border border-[#ecd4bc]"
          >
            Go to Next Step →
          </button>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default Home;