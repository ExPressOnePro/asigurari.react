import React from "react";
import Link from "next/link";

interface ConsentToggleProps {
    isConsentGiven: boolean;
    setIsConsentGiven: (value: boolean) => void;
}

const ConsentToggle: React.FC<ConsentToggleProps> = ({ isConsentGiven, setIsConsentGiven }) => (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
        <div
            className={`${isConsentGiven ? "bg-green-500" : "bg-gray-400"} relative inline-block w-16 h-8 rounded-full cursor-pointer`}
            onClick={() => setIsConsentGiven(!isConsentGiven)}
        >
            <span
                className={`${isConsentGiven ? "translate-x-8" : "translate-x-0"} inline-block w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300`}
            />
        </div>
        <div className="flex flex-col sm:flex-row items-center space-x-2">
            <label htmlFor="consent" className="text-sm text-gray-700 flex-grow">
                Согласие на обработку данных
            </label>
            <Link href={`/Privacy`} className="text-blue-700">
                Политика конфиденциальности
            </Link>
            <input
                type="checkbox"
                id="consent"
                checked={isConsentGiven}
                onChange={() => setIsConsentGiven(!isConsentGiven)}
                className="sr-only"
            />
        </div>
    </div>
);

export default ConsentToggle;
