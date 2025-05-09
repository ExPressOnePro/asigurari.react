import React from "react";

interface SumaDeAsigSelectProps {
    value: string;
    onChange: (value: string) => void;
}

const SumaDeAsigSelect: React.FC<SumaDeAsigSelectProps> = ({ value, onChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <label className="text-gray-700 font-medium">Сумма страхования</label>
            <select
                className="p-3 border rounded-lg w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)} // остаётся строкой
            >
                <option value="">Выберите сумму</option>
                <option value="30000">30 000</option>
                <option value="50000">50 000</option>
            </select>
        </div>
    );
};

export default SumaDeAsigSelect;
