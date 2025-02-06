import React, { useState } from "react";

interface OperatingModeSelectProps {
    value: string;
    onChange: (value: string) => void;
    dictionary: any;
}

const OperatingModeSelect: React.FC<OperatingModeSelectProps> = ({
                                                                     value,
                                                                     onChange,
                                                                     dictionary,
                                                                 }) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "") {
            setError(dictionary?.osago?.OperatingModes?.SelectOperatingModeError || "Please select a vehicle type.");
        } else {
            setError(null);
            onChange(e.target.value);
        }
    };

    return (
        <div className="relative">
            <label htmlFor="OperatingModes" className="block text-sm font-bold text-gray-700">
                {dictionary?.osago?.OperatingModes?.OperatingModesLabel}
            </label>
            <div className="flex items-center mt-2">
                <select
                    id="OperatingModes"
                    value={value}
                    onChange={handleChange}
                    className="block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">
                        -- {dictionary?.osago?.OperatingModes?.SelectOperatingMode} --
                    </option>
                    <option value="1">{dictionary?.osago?.OperatingModes?.OperatingMode1}</option>
                    <option value="2">{dictionary?.osago?.OperatingModes?.OperatingMode2}</option>
                    <option value="3">{dictionary?.osago?.OperatingModes?.OperatingMode3}</option>
                    <option value="4">{dictionary?.osago?.OperatingModes?.OperatingMode4}</option>
                    <option value="5">{dictionary?.osago?.OperatingModes?.OperatingMode5}</option>
                </select>
                <div className="ml-2 relative group">
                    <div
                        className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-md mt-2 px-4 py-3 text-sm text-gray-700 w-64"
                    >
                        <p>{dictionary?.osago?.RCAForm?.OperatingModesDescription}</p>
                    </div>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default OperatingModeSelect;
