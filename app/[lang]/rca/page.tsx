"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import RCAController from "./RCAController";
import PageTitle from "@/app/[lang]/components/PageTitle";
import InfoBlock from "@/app/[lang]/components/InfoBlock";
import { useLocalization } from "@/lib/LocalizationProvider";

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
            </div>
        </Provider>
    );
}
