import React, {useState} from "react";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQAccordion: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const {dictionary} = useLocalization();

    const toggleAnswer = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Use the translated FAQ items from your dictionary.
    // Optionally, add a fallback if the localization data isn't ready yet.
    const faqData: FAQItem[] = dictionary.page.cards.rca.faq?.items || [];

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
            <div className="w-full max-w-6xl">
                <div className="rounded-lg p-8">
                    {/* Use a translated heading */}
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        {dictionary.page.cards.rca.questionTitle}
                    </h2>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={index} className="border-b last:border-none shadow rounded-3">
                                <div
                                    className="cursor-pointer flex justify-between items-center py-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 px-2 rounded-lg"
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <span>{item.question}</span>
                                    <span
                                        className={`transform transition-transform duration-300 ${
                                            activeIndex === index ? "rotate-180" : ""
                                        }`}
                                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                      <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                      />
                    </svg>
                  </span>
                                </div>
                                {activeIndex === index && (
                                    <div className="py-4 px-6 text-gray-600 shadow rounded-3">
                                        <p>{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQAccordion;
