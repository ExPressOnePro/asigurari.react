"use client";


import { useLocalization } from "@/lib/LocalizationProvider";
import Card from "@/app/[lang]/components/Card";
import { getStaticUrl } from "@/app/[lang]/components/Footer";

export default function Home() {
    const { dictionary } = useLocalization();

    return (
        <div className="min-h-screen">
            <section className="py-16 h-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2">
                            <img
                                src={getStaticUrl("public/porsche.png")}
                                alt="Страхование транспортных средств"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="w-full lg:w-1/2 lg:pl-12 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                {dictionary.page.home.title}
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">{dictionary.page.home.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Используем компонент Card для каждой карточки */}
                        <Card
                            image={getStaticUrl("public/rca_card.png")}
                            title={dictionary.page.cards.rca.title}
                            description={dictionary.page.cards.rca.description}
                            buttonText={dictionary.page.cards.rca.button}
                            link="/rca"
                        />
                        <Card
                            image={getStaticUrl("public/green_card_card.png")}
                            title={dictionary.page.cards.greencard.title}
                            description={dictionary.page.cards.greencard.description}
                            buttonText={dictionary.page.cards.greencard.button}
                            link="/greencard"
                        />
                        <Card
                            image={getStaticUrl("public/medical_card.png")}
                            title={dictionary.page.cards.medical.title}
                            description={dictionary.page.cards.medical.description}
                            buttonText={dictionary.page.cards.medical.button}
                            link="/medical"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
