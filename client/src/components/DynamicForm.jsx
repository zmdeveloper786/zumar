import React from 'react';

const DynamicForm = ({ fields, onChange, formData }) => {
  return (
    <div className="space-y-4 mt-4">
      {fields.map((field, idx) => (
        <div key={idx}>
          <label className="block mb-1 text-sm font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={field.type !== 'file' ? formData[field.name] || '' : undefined}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            {...(field.type === 'file' ? {} : { required: true })}
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
