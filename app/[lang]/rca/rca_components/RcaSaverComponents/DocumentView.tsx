import {useDispatch} from "react-redux";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

export default function DocumentView({ documentUrl, onSendEmailClick }: any) {
    const {dictionary} = useLocalization();
    return (
        <div className="flex flex-col items-center mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">{dictionary?.RCA?.RCASaver?.Ready}</h3>
            <p className="text-gray-600 text-sm text-center mt-1">{dictionary?.RCA?.RCASaver?.open_or_download}</p>
            <img src={dictionary.RCA?.RCASaver?.doc} alt="Превью документа" className="mt-4 w-40 h-auto" />

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition">
                    Открыть документ
                </a>
                <button onClick={onSendEmailClick} className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow hover:bg-yellow-600 transition">
                    📧 Отправить на почту
                </button>
            </div>
        </div>
    );
}
