import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const getRequiredDocuments = (serviceType) => {
  const documents = {
    "NTN Registration - Salaried": [
      "CNIC Copy (Both Sides)",
      "Passport Size Photo",
      "Salary Slip",
      "Appointment Letter"
    ],
    "NTN Registration - Business": [
      "CNIC Copy (Both Sides)",
      "Passport Size Photo",
      "Rent Agreement",
      "Utility Bill"
    ],
    // Add more service types and their required documents
  };
  return documents[serviceType] || [];
};

const AddDetails = () => {
  const { serviceTitle } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cnic: '',
    documents: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      toast.success('Details submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit details');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#57123f]">
        Add Service Details
      </h1>
      
      <div className="text-center mb-4 text-lg font-medium">
        Selected Service: <span className="text-[#57123f]">{decodeURIComponent(serviceTitle)}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Manual Entry Option */}
        <div className="border-2 border-dashed border-[#ecd4bc] p-6 text-center rounded-lg">
          <p className="mb-3 font-semibold">Add Details Manually</p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-[#57123f] text-white px-5 py-2 rounded hover:bg-opacity-90"
          >
            Add Details
          </button>
        </div>

        {/* WhatsApp Option */}
        <div className="border-2 border-dashed border-[#ecd4bc] p-6 text-center rounded-lg">
          <p className="mb-3 font-semibold">Send Details via WhatsApp</p>
          <a
            href={`https://wa.me/923254992099?text=I want to register for: ${serviceTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-opacity-90"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded p-2"
              required
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border rounded p-2"
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="text"
              placeholder="CNIC Number"
              className="border rounded p-2"
              required
              onChange={(e) => setFormData({...formData, cnic: e.target.value})}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded p-2"
              required
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          {/* Required Documents Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#57123f] mb-4">Required Documents</h3>
            <ul className="list-disc pl-5 space-y-2">
              {getRequiredDocuments(decodeURIComponent(serviceTitle)).map((doc, index) => (
                <li key={index} className="text-gray-700">
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#57123f] text-white py-2 rounded hover:bg-opacity-90"
            >
              Submit Details
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddDetails;
