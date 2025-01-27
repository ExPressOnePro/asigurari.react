import React from "react";

const SpinnerBlue: React.FC = () => {
    return (
        <div className="flex items-center justify-center p-3">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mr-3"></div>
        </div>
    );
};

export default SpinnerBlue;
