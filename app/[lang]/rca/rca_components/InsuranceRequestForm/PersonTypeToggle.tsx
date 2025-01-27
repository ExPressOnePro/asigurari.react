// PersonTypeToggle.tsx
import React from "react";

interface PersonTypeToggleProps {
    PersonIsJuridical: boolean;
    setPersonIsJuridical: (value: boolean) => void;
    dictionary: any;
}

const PersonTypeToggle: React.FC<PersonTypeToggleProps> = ({
                                                               PersonIsJuridical,
                                                               setPersonIsJuridical,
                                                               dictionary,
                                                           }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <label className="text-sm font-bold text-gray-700 mb-2 sm:mb-0">
                {dictionary?.osago?.RCAForm?.PersonTypeLabel}
            </label>
            <div className="flex items-center gap-2 sm:gap-4 sm:flex-row w-full">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md w-full sm:w-auto ${
                        !PersonIsJuridical
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => setPersonIsJuridical(false)}
                >
                    {dictionary?.osago?.RCAForm?.PhysicalPerson}
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md w-full sm:w-auto ${
                        PersonIsJuridical
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => setPersonIsJuridical(true)}
                >
                    {dictionary?.osago?.RCAForm?.LegalPerson}
                </button>
            </div>
        </div>
    );
};

export default PersonTypeToggle;
