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
