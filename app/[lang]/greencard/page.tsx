"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import GreenCardController from "./GreenCardController";
import { useLocalization } from "@/lib/LocalizationProvider";
import PageTitle from "@/app/[lang]/components/PageTitle";
import InfoBlock from "@/app/[lang]/components/InfoBlock";

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
            </div>
        </Provider>
    );
}
