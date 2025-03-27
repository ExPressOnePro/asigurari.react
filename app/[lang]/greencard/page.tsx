"use client";

import {Provider} from "react-redux";
import {store} from "@/store/store.ts";
import GreenCardController from "@/app/[lang]/greencard/GreenCardController.tsx";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";
import PageTitle from "@/app/[lang]/components/PageTitle.tsx";
import InfoBlock from "@/app/[lang]/components/InfoBlock.tsx";
import FAQAccordion from "@/app/[lang]/components/FAQAccordion.tsx";

export default function Page() {
    const { dictionary } = useLocalization();
    return (
        <Provider store={store}>
            <div className="min-h-screen">
                <PageTitle
                    title={dictionary?.RCE?.GCRF.Title}
                />

                <GreenCardController />

                <InfoBlock
                    title={dictionary.page.cards.rca.title}
                    longDescription={dictionary.page.cards.rca.longDescription}
                />
                <FAQAccordion
                    faqData={dictionary.page.cards.rca.faq?.items || []}
                    title={dictionary.page.cards.rca.questionTitle}
                />
            </div>
        </Provider>

        //
        // <div className="min-h-screen">
        //         <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        //                 <div className="w-full max-w-3xl">
        //                         <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
        //                                 Оформление "Зеленой карты"
        //                         </h1>
        //                 </div>
        //         </div>
        //
        //         {/* Step 1*/}
        //         {currentStep === 1 && (
        //             <Provider store={store}>
        //                     <GreenCardRequestForm
        //                         onStepChange={handleStepChange}
        //                         onInsurersUpdate={handleInsurersUpdate}
        //                     />
        //             </Provider>
        //         )}
        //
        //     {currentStep > 1 && (
        //         <Provider store={store}>
        //             <SelectedParametersGreenCard
        //                 dictionary={dictionary}
        //                 currentStep={currentStep}/>
        //         </Provider>
        //     )}
        //
        //     {/* Step 2 */}
        //     {currentStep === 2 && (
        //         <Provider store={store}>
        //             <InsurerListGreenCard
        //                 insurers={insurers}
        //                 dictionary={dictionary}
        //                 onStepChange={handleStepChange}
        //             />
        //         </Provider>
        //     )}
        // </div>
    );
}
