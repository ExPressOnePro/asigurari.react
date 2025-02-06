"use client";

import Link from "next/link";
import LocaleSwitcher from "@/app/[lang]/components/locale-switcher";
import MobileMenuToggle from "@/app/[lang]/components/MobileMenuToggle";
import {getStaticUrl} from "@/app/[lang]/components/Footer.tsx";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";


export default function Header({ lang }: { lang: string }) {
  const { dictionary } = useLocalization();

  return (
      <header className="py-6 bg-gray-50 shadow-md">
        <nav className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link
                href={`/${lang}`}
                className="text-xl font-bold text-blue-700"
            >
              <img
                  src={getStaticUrl('public/Logo.png')}
                  alt="Logo"
                  className="inline-block h-auto w-auto max-h-12 max-w-full mr-2"
              />
            </Link>
            {/* Передаем управление мобильным меню в клиентский компонент */}
            <MobileMenuToggle lang={lang}/>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex gap-x-8">
              <li>
                <Link
                    href={`/${lang}`}
                    className="text-gray-700 hover:text-orange-700"
                >
                  {dictionary.navigation.home}
                </Link>
              </li>
              <li>
                <Link
                    href={`/${lang}/rca`}
                    className="text-gray-700 hover:text-orange-700"
                >
                  {dictionary.navigation.rca}
                </Link>
              </li>
              <li>
                <Link
                    href={`/${lang}/greencard`}
                    className="text-gray-700 hover:text-orange-700"
                >
                  {dictionary.navigation.greencard}
                </Link>
              </li>
              <li>
                <Link
                    href={`/${lang}/medical`}
                    className="text-gray-700 hover:text-orange-700"
                >
                  {dictionary.navigation.medical}
                </Link>
              </li>
            </ul>
            <LocaleSwitcher />
          </div>
        </nav>
      </header>
  )
}
