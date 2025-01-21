interface SubmitButtonProps {
    isConsentGiven: boolean;
    isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isConsentGiven, isLoading }) => (
    <div>
        <button
            type="submit"
            disabled={!isConsentGiven || isLoading}
            className={`w-full ${isLoading ? "bg-gray-400 cursor-wait" : isConsentGiven ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"} text-white font-semibold py-2 px-4 rounded-lg shadow-md`}
        >
            {isLoading ? "Загрузка..." : "Рассчитать"}
        </button>
    </div>
);

export default SubmitButton;
