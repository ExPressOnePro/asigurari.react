import {getDictionary} from '@/lib/dictionary';
import { Locale } from "../../../i18n.config";

type Props = {
    children: React.ReactNode;
    params: { lang: Locale };
};

export default async function MedicalLayout({ children, params }: Props) {
    // Get the dictionary outside of any client-side operations
    const dictionary = await getDictionary(params.lang);
    const lang = params.lang;

    return (
        <div className="medical-layout">
            {children}
        </div>
    );
}
