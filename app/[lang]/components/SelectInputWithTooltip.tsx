import React from "react";

interface SelectInputWithTooltipProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    tooltipImage?: string;
    required?: boolean;
}

const SelectInputWithTooltip: React.FC<SelectInputWithTooltipProps> = ({
                                                                           id,
                                                                           label,
                                                                           value,
                                                                           onChange,
                                                                           options,
                                                                           tooltipImage,
                                                                           required = true,
                                                                       }) => (
    <div className="relative">
        <label htmlFor={id} className="block text-sm font-bold text-gray-700">
            {label}
        </label>
        <div className="flex items-center mt-2">
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required={required}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {tooltipImage && (
                <div className="ml-2 relative group">
                    <button
                        type="button"
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
                        aria-label="Дополнительная информация"
                    >
                        ?
                    </button>
                    <div
                        className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-md mt-2 px-4 py-3 text-sm text-gray-700 w-64"
                    >
                        <img
                            src={tooltipImage}
                            alt="Пример"
                            className="w-full h-auto mb-2 rounded-md"
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default SelectInputWithTooltip;
