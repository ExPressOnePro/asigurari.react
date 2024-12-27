'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const getFlagUrl = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'https://flagcdn.com/w320/gb.png'; // Флаг Великобритании
      case 'ro':
        return 'https://flagcdn.com/w320/ro.png'; // Флаг Румынии
      case 'ru':
        return 'https://flagcdn.com/w320/ru.png'; // Флаг России
      default:
        return 'https://flagcdn.com/w320/ww.png'; // Флаг мира
    }
  }

  return (
      <ul className="flex gap-x-4 justify-center items-center p-4 bg-gradient-to-r from-gray-50">
        {i18n.locales.map((locale) => (
            <li key={locale}>
              <Link
                  href={redirectedPathName(locale)}
                  className="inline-block px-5 py-2.5 text-sm font-medium text-gray-800 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <img
                    src={getFlagUrl(locale)}
                    alt={locale}
                    className="inline-block w-5 h-5 mr-2"
                />
                {locale.toUpperCase()}
              </Link>
            </li>
        ))}
      </ul>
  )
}
