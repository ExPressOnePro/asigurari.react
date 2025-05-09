import React, { useState, useEffect, useRef } from "react";

interface Country {
    codUIN: string;
    naimenovanie: string;
}

interface CountrySelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    countries: Country[];
    onSelect: (codUIN: string) => void;
    placeholder: string;
}

const CountrySelectInput: React.FC<CountrySelectInputProps> = ({
                                                                   label,
                                                                   value = '',
                                                                   onChange,
                                                                   countries,
                                                                   onSelect,
                                                                   placeholder
                                                               }) => {
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const sortedCountries = [...countries].sort((a, b) =>
        a.naimenovanie.localeCompare(b.naimenovanie)
    );

    const filteredCountries = sortedCountries.filter(country =>
        country.naimenovanie.toLowerCase().includes(query.toLowerCase())
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        setShowDropdown(true);
        onChange(inputValue);
    };

    const handleSelect = (country: Country) => {
        onChange(country.naimenovanie);
        onSelect(country.codUIN);
        setQuery(country.naimenovanie);
        setShowDropdown(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4" ref={wrapperRef}>
            <label className="text-gray-700 font-medium">{label}</label>
            <div className="relative w-full">
                <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && (
                    <ul className="absolute z-10 w-full bg-white border rounded-lg max-h-60 overflow-auto shadow">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map(country => (
                                <li
                                    key={country.codUIN}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(country)}
                                >
                                    {country.naimenovanie}
                                </li>
                            ))
                        ) : (
                            <li className="p-3 text-gray-500">Страна не найдена</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CountrySelectInput;
