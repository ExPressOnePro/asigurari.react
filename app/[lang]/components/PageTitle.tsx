import React from "react";

interface PageTitleProps {
    title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
                    {title}
                </h1>
            </div>
        </div>
    // <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-8">
    //     {title}
    // </h1>
)
    ;
};

export default PageTitle;
