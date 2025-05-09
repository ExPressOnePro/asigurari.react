import React from "react";

interface LabeledInputProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
                                                       label,
                                                       type = "text",
                                                       name,
                                                       value,
                                                       onChange,
                                                       placeholder
                                                   }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <label className="text-gray-700 font-medium">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 border rounded-lg"
                placeholder={placeholder}
            />
        </div>
    );
};

export default LabeledInput;
