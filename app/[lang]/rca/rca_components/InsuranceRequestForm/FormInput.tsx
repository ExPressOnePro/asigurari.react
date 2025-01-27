// FormInput.tsx
import React from 'react';

interface FormInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    tooltipImage?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, value, onChange, placeholder, tooltipImage }) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type="text"
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {tooltipImage && <img src={tooltipImage} alt="tooltip" className="mt-2" />}
    </div>
);

export default FormInput;
