import { useState } from 'react';
import { useParams } from 'react-router-dom';

const serviceFields = {
  'NTN Registration - Salaried': [
    { name: 'salary_slip', label: 'Salary Slip', type: 'file' },
    { name: 'appointment_letter', label: 'Appointment Letter', type: 'file' },
    { name: 'bank_statement', label: 'Bank Statement', type: 'file' }
  ],
  'NTN Registration - Business': [
    { name: 'rent_agreement', label: 'Rent Agreement', type: 'file' },
    { name: 'utility_bill', label: 'Utility Bill', type: 'file' },
    { name: 'bank_statement', label: 'Bank Statement', type: 'file' }
  ],
  // Add more service-specific fields here
};

const AddServiceDetails = () => {
  const { serviceTitle } = useParams();
  const [showForm, setShowForm] = useState(false);
  const fields = serviceFields[decodeURIComponent(serviceTitle)] || [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#57123f]">Add Service Details</h1>
      
      <div className="text-center mb-4 text-lg font-medium">
        Selected Service: <span className="text-[#5B2148]">{decodeURIComponent(serviceTitle)}</span>
      </div>

      {/* Form Fields */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        {/* Full Name, Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input className="border rounded p-3" placeholder="Add Full Name" />
          <input className="border rounded p-3" placeholder="Add Email" />
        </div>
        {/* CNIC and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Enter CNIC No." />
          <div className="flex items-center border rounded p-3">
            <span className="text-gray-500 mr-2">+92</span>
            <input className="flex-1 outline-none" placeholder="XXXXXXXXXX" />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Manual Entry */}
        <div className="border-2 border-dashed p-6 text-center rounded-lg">
          <p className="mb-3 font-semibold">Add Details Manually</p>
          <p className="text-sm text-gray-500 mb-4">Add the details properly as they will be used. Any wrong details can cause rejection.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-[#57123f] text-white px-5 py-2 rounded"
          >
            Add Details Manually
          </button>
        </div>

        {/* WhatsApp */}
        <div className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="mx-auto w-16 mb-4"
          />
          <p className="font-semibold mb-2">Send your details on WhatsApp</p>
          <a
            href={`https://wa.me/923254992099?text=I want to register for: ${decodeURIComponent(serviceTitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-5 py-2 rounded hover:bg-gray-100 inline-block"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>      

      {/* Dynamic Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#57123f]">Required Documents</h2>
          <form className="space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  className="border rounded p-2"
                  accept={field.type === 'file' ? '.pdf,.jpg,.jpeg,.png' : undefined}
                />
              </div>
            ))}
            {fields.length > 0 && (
              <button
                type="submit"
                className="bg-[#57123f] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Submit Documents
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default AddServiceDetails;
