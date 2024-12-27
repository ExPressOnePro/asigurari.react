import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import Link from "next/link";
import LocaleSwitcher from "@/app/[lang]/components/locale-switcher";
import MobileMenuToggle from "@/app/[lang]/components/MobileMenuToggle";


export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)

  return (
      <header className="py-6 bg-gray-50 shadow-md">
        <nav className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link
                href={`/${lang}`}
                className="text-xl font-bold text-blue-700"
            >
              Logo
            </Link>
            {/* Передаем управление мобильным меню в клиентский компонент */}
            <MobileMenuToggle lang={lang} navigation={navigation} />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex gap-x-8">
              <li>
                <Link
                    href={`/${lang}`}
                    className="text-gray-700 hover:text-blue-700"
                >
                  {navigation.home}
                </Link>
              </li>
              <li>
                <Link
                    href={`/${lang}/rca`}
                    className="text-gray-700 hover:text-blue-700"
                >
                  {navigation.rca}
                </Link>
              </li>
              <li>
                <Link
                    href={`/${lang}/greencard`}
                    className="text-gray-700 hover:text-blue-700"
                >
                  {navigation.greencard}
                </Link>
              </li>
              <li>
                <Link
                    href={`/${lang}/medical`}
                    className="text-gray-700 hover:text-blue-700"
                >
                  {navigation.medical}
                </Link>
              </li>
            </ul>
            <LocaleSwitcher />
          </div>
        </nav>
      </header>
  )
}
