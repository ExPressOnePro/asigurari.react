"use client";

import {Provider } from "react-redux";
import {store} from "@/store/store.ts";
import RCAController from "@/app/[lang]/rca/RCAController.tsx";
import PageTitle from "@/app/[lang]/components/PageTitle.tsx";
import InfoBlock from "@/app/[lang]/components/InfoBlock.tsx";
import FAQAccordion from "@/app/[lang]/components/FAQAccordion.tsx";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

export default function Page() {
    const { dictionary } = useLocalization();
    return (
        <Provider store={store}>
            <div className="min-h-screen">
                <PageTitle
                    title={dictionary?.RCA?.IRF.Title}
                />

                <RCAController />

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
    );
}
