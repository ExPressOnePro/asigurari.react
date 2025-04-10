"use client";

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import MedicalController from "./MedicalController";
import PageTitle from "../components/PageTitle";
import InfoBlock from "../components/InfoBlock";
import { useLocalization } from "../../../lib/LocalizationProvider";

export default function Page() {
    const { dictionary } = useLocalization();
    return (
        <Provider store={store}>
            <div className="min-h-screen">
                <PageTitle
                    title={dictionary?.medical?.MF?.Title}
                />

                <MedicalController />

                <InfoBlock
                    title={dictionary.page.cards.medical.title}
                    longDescription={dictionary.page.cards.medical.longDescription}
                />
            </div>
        </Provider>
    );
}

