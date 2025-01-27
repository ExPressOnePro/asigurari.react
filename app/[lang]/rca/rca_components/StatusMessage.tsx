// StatusMessage.tsx
import React from 'react';

interface StatusMessageProps {
    message: string;
    isError: boolean;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message, isError }) => (
    <div className={`mt-4 text-sm text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
        {message}
    </div>
);

export default StatusMessage;
