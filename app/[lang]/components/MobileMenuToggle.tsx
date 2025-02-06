// app/[lang]/components/MobileMenuToggle.tsx (Client Component)
'use client'

import { useState } from 'react'
import Link from "next/link";
import { Locale } from "@/i18n.config";
import LocaleSwitcher from "@/app/[lang]/components/locale-switcher";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

export default function Header({ lang }: { lang: string }) {
    const { dictionary } = useLocalization();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Кнопка открытия меню */}
            <button
                className="block md:hidden text-gray-700 focus:outline-none"
                aria-label="Toggle menu"
                onClick={toggleMenu}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Выезжающее меню */}
            <div
                className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleMenu}
            >
                <div
                    className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg transform transition-transform duration-300 ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике внутри меню
                >
                    <div className="p-4">
                        {/* Закрыть меню */}
                        <button
                            className="mb-4 text-gray-700 focus:outline-none"
                            aria-label="Close menu"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Навигация */}
                        <ul className="space-y-6">
                            {/* Основные разделы */}
                            <li>
                                <Link
                                    href={`/${lang}`}
                                    className="block text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {dictionary.navigation.home}
                                </Link>
                            </li>
                            <div className="border-t border-gray-300 my-4"/>
                            <li>
                                <Link
                                    href={`/${lang}/rca`}
                                    className="block text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {dictionary.navigation.rca}
                                </Link>
                            </li>

                            <div className="border border-gray-300 my-4"/>

                            {/* Дополнительные разделы */}
                            <li>
                                <Link
                                    href={`/${lang}/greencard`}
                                    className="block text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {dictionary.navigation.greencard}
                                </Link>
                            </li>
                            <div className="border-t border-gray-300 my-4"/>
                            <li>
                                <Link
                                    href={`/${lang}/medical`}
                                    className="block text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {dictionary.navigation.medical}
                                </Link>
                            </li>
                        </ul>

                    </div>
                    <LocaleSwitcher/>
                </div>
            </div>
        </>
    );
}
