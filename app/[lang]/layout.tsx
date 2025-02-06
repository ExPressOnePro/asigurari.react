import './globals.css';
import { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import { Inter } from 'next/font/google';
import Footer from "@/app/[lang]/components/Footer";
import BubbleBackground from "@/app/[lang]/components/BubbleBackground";
import Header from "@/app/[lang]/components/Header";
import { LocalizationProvider } from "@/lib/LocalizationProvider";
import { getDictionary } from '@/lib/dictionary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Top Asig',
    description: 'Top Asig',
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}
    export default async function RootLayout({
                                                 children,
                                                 params,
                                             }: {
        children: React.ReactNode;
        params: { lang: Locale };  // Этот параметр нужно будет ожидать
    }) {
        const { lang } =  params; // После того, как мы ожидаем params
        const dictionary = await getDictionary(params.lang);


        return (
        <html lang={params.lang}>
        <body className={inter.className}>
        <LocalizationProvider initialLocale={params.lang} dictionary={dictionary}>
            <Header lang={lang} />
            <BubbleBackground />
            <main>{children}</main>
            <Footer />
        </LocalizationProvider>
        </body>
        </html>
    );
}
