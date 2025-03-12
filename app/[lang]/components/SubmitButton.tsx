import { useLocalization } from "@/lib/LocalizationProvider.tsx";

interface SubmitButtonProps {
    isConsentGiven: boolean;
    isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isConsentGiven, isLoading }) => {
    const { dictionary } = useLocalization();  // Хук должен быть внутри компонента

    return (
        <div>
            <button
                type="submit"
                disabled={!isConsentGiven || isLoading}
                className={`w-full ${isLoading ? "bg-gray-400 cursor-wait" : isConsentGiven ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"} text-white font-semibold py-2 px-4 rounded-lg shadow-md`}
            >
                {isLoading ? "Загрузка..." : dictionary?.RCA?.IRF?.ButtonCalculate}
            </button>
        </div>
    );
};

export default SubmitButton;
