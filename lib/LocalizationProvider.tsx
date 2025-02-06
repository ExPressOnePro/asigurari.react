"use client";

import React, { createContext, useContext, useState } from "react";
import { Locale } from "@/i18n.config";

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
                                         dictionary,
                                     }: {
    children: React.ReactNode;
    initialLocale: Locale;
    dictionary: Record<string, any>;
}) => {
    const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);

    const changeLocale = (locale: Locale) => setCurrentLocale(locale);

    return (
        <LocalizationContext.Provider
            value={{ dictionary, currentLocale, changeLocale }}
        >
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error(
            "useLocalization must be used within a LocalizationProvider"
        );
    }
    return context;
};
