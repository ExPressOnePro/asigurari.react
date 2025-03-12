import React, { useState } from "react";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

interface OperatingModeSelectProps {
    value: string;
    onChange: (value: string) => void;
}

const OperatingModeSelect: React.FC<OperatingModeSelectProps> = ({ value, onChange,}) => {
    const [error, setError] = useState<string | null>(null);
    const { dictionary } = useLocalization();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "") {
            setError(dictionary?.RCA?.IRF?.SelectOperatingModeError || "Please select a vehicle type.");
        } else {
            setError(null);
            onChange(e.target.value);
        }
    };

    return (
        <div className="relative">
            <label htmlFor="OperatingModes" className="block text-sm font-bold text-gray-700">
                {dictionary?.RCA?.IRF?.OperatingModesLabel}
            </label>
            <div className="flex items-center mt-2">
                <select
                    id="OperatingModes"
                    value={value}
                    onChange={handleChange}
                    className="block w-full px-6 py-3 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">
                        -- {dictionary?.RCA?.IRF?.SelectOperatingMode} --
                    </option>
                    <option value="1">{dictionary?.RCA?.IRF?.OperatingMode1}</option>
                    <option value="2">{dictionary?.RCA?.IRF?.OperatingMode2}</option>
                    <option value="3">{dictionary?.RCA?.IRF?.OperatingMode3}</option>
                    <option value="4">{dictionary?.RCA?.IRF?.OperatingMode4}</option>
                    <option value="5">{dictionary?.RCA?.IRF?.OperatingMode5}</option>
                </select>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default OperatingModeSelect;
