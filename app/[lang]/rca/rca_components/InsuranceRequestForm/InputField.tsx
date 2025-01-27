import React from "react";

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, placeholder, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-bold text-gray-700">
            {label}
        </label>
        <input
            type="text"
            id={id}
            value={value}
            onChange={onChange}
            className="mt-2 block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

export default InputField;
