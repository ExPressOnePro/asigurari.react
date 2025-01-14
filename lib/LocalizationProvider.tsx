"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

interface LocalizationContextProps {
    dictionary: Record<string, any>;
    currentLocale: Locale;
    changeLocale: (locale: Locale) => void;
}

const LocalizationContext = createContext<LocalizationContextProps | undefined>(
    undefined
);

export const LocalizationProvider = ({
                                         children,
                                         initialLocale,
                                     }: {
    children: React.ReactNode;
    initialLocale: Locale;
}) => {
    const [dictionary, setDictionary] = useState<Record<string, any>>({});
    const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);

    useEffect(() => {
        const loadDictionary = async () => {
            const dict = await getDictionary(currentLocale);
            setDictionary(dict);
        };
        loadDictionary();
    }, [currentLocale]);

    const changeLocale = (locale: Locale) => setCurrentLocale(locale);

    return (
        <LocalizationContext.Provider value={{ dictionary, currentLocale, changeLocale }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error("useLocalization must be used within a LocalizationProvider");
    }
    return context;
};
