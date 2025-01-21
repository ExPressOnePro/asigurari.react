const LoadingIndicator: React.FC = () => (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

export default LoadingIndicator;
