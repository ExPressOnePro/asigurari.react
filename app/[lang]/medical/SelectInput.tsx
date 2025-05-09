import React from "react";

interface Option {
    codUIN: string;
    cod: string;
    naimenovanie: string;
}

interface SelectInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, options, placeholder }) => {
    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
                <option value="">{placeholder || "Выберите значение"}</option>
                {options?.map((opt) => (
                    <option key={opt.codUIN} value={opt.codUIN}>
                        {opt.naimenovanie}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
