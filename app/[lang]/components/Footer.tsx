export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-200 to-orange-300 py-12">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Logo and Company Info */}
                    <div>
                        <img
                            className="filter grayscale w-32 mx-auto md:mx-0 mb-4"
                            src="https://api-mda.viapp.tech/myStorageDisk/aed11edd-83fe-4bab-919e-6b16d6f678ee_mainlogo.svg"
                            alt="Logo"
                        />
                        <p className="text-sm leading-6">
                            BAR Global Broker SRL<br />
                            ул. Дечебал 34, Бельцы,<br />
                            Республика Молдова<br />
                            IDNO: 1010600008839<br />
                            Лицензия: CNPF 000907
                        </p>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-3">Поддержка</h3>
                        <p className="text-sm leading-6 mb-4">
                            <a href="mailto:info@asig.md" className="hover:underline">info@asig.md</a><br />
                            <a href="tel:+37361000179" className="hover:underline">+373 61 000 179</a>1
                        </p>
                        <div className="flex justify-center md:justify-start space-x-3">
                            <a href="https://wa.me/37361000179" className="hover:opacity-80">
                                {/*<img src="images/content/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />*/}
                            </a>
                            <a href="viber://chat?number=%2B37361000179" className="hover:opacity-80">
                                {/*<img src="images/content/Viber.svg" alt="Viber" className="w-8 h-8" />*/}
                            </a>
                            <a href="https://t.me/asigmd" className="hover:opacity-80">
                                {/*<img src="images/content/Telegram.svg" alt="Telegram" className="w-8 h-8" />*/}
                            </a>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-lg font-bold mb-3">Продукты</h3>
                        <ul className="space-y-2">
                            <li><a href="/rca" className="hover:underline">Страхование ОСАГО</a></li>
                            <li><a href="/greencard" className="hover:underline">Зеленая карта</a></li>
                            <li><a href="/travel" className="hover:underline">Трэвел</a></li>
                        </ul>
                    </div>

                    {/* App and Powered By */}
                    <div>
                        <h3 className="text-lg font-bold mb-3">Мобильные приложения</h3>
                        <div className="flex flex-col items-center md:items-start space-y-3">
                            {/*<img src="images/content/App-Store.png" alt="App Store" className="w-32" />*/}
                            {/*<img src="images/content/Google-Play.png" alt="Google Play" className="w-32" />*/}
                        </div>
                        <div className="mt-6">
                            <a href="https://partnership.viapp.tech?utm_sitefrom=asig.md/">
                                {/*<img src="images/content/powerup9.png" alt="Powered By" className="w-32" />*/}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-indigo-400 mt-8 pt-6 text-sm flex flex-col md:flex-row justify-between items-center text-center">
                    <div className="flex space-x-4">
                        <a href="/terms" className="hover:underline">Условия и положения</a>
                        <a href="/privacy" className="hover:underline">Политика безопасности</a>
                    </div>
                    <div className="mt-4 md:mt-0">
                        {/*<img src="images/content/logo.png" alt="Payment Logos" className="w-32" />*/}
                    </div>
                </div>
            </div>
        </footer>
    );
}