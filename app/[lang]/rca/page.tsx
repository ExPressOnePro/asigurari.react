"use client";

import {Provider } from "react-redux";
import {store} from "@/store/store.ts";
import RCAController from "@/app/[lang]/rca/RCAController.tsx";
import TitleRCA from "@/app/[lang]/rca/textComponents/TitleRCA.tsx";
import InfoRCA from "@/app/[lang]/rca/textComponents/InfoRCA";
import FAQAccordion from "@/app/[lang]/rca/textComponents/FAQAccordion";

export default function Page() {
    return (
        <Provider store={store}>
            <div className="min-h-screen">
                <TitleRCA/>
                <RCAController />
                <InfoRCA/>
                <FAQAccordion/>
            </div>
        </Provider>
    );
}
    // <div className="min-h-screen">
    //         <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
    //             <div className="w-full max-w-3xl">
    //                 <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
    //                      {dictionary?.osago?.Title || ""}
    //               </div>
    //          </div>



            {/*/!* Step 1*!/*/}
            {/*{currentStep === 1 && (*/}
            {/*    <InsuranceRequestForm*/}
            {/*        dictionary={dictionary}*/}
            {/*        onStepChange={handleStepChange}*/}
            {/*        onInsurersUpdate={handleInsurersUpdate} // Передаем функцию для обновления insurers*/}
            {/*    />*/}
            {/*)}*/}

            {/*{currentStep > 1 && (*/}
            {/*    <SelectedParameters*/}
            {/*        dictionary={dictionary}*/}
            {/*        currentStep={currentStep}*/}
            {/*    />*/}
            {/*)}*/}


            {/*/!* Step 2 *!/*/}
            {/*{currentStep === 2 && (*/}
            {/*    <InsurerList*/}
            {/*        insurers={insurers}*/}
            {/*        dictionary={dictionary}*/}
            {/*        onStepChange={handleStepChange}*/}
            {/*        onSelectInsurer={handleSelectInsurer}*/}
            {/*    />*/}
            {/*)}*/}

            {/*{currentStep === 3 && (*/}
            {/*    <AdditionalDataForm*/}
            {/*        dictionary={dictionary}*/}
            {/*        onStepChange={handleStepChange}*/}
            {/*    />*/}
            {/*)}*/}

            {/*/!*{currentStep === 4 && (*!/*/}
            {/*/!*    <Provider store={store}>*!/*/}
            {/*/!*        <ContactForm*!/*/}
            {/*/!*        />*!/*/}
            {/*/!*    </Provider>*!/*/}
            {/*/!*)}*!/*/}

            {/*{currentStep === 4 &&*/}
            {/*    <>*/}
            {/*        <p>{selectedInsurer?.PrimeSumMDL}</p>*/}
            {/*        <QRCodeRequest primeSumMDL={selectedInsurer?.PrimeSumMDL} />*/}
            {/*    </>*/}
            {/*}*/}


            {/*{currentStep === 5 && (*/}
            {/*    <RCASaver/>*/}
