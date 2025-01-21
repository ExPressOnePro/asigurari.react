interface ErrorMessageProps {
    error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
    <p className="text-sm text-red-500 mt-4">{error}</p>
);

export default ErrorMessage;
