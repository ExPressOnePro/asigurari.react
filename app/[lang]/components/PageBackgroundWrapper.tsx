import React from "react";

interface Props {
    children: React.ReactNode;
}

const PageBackgroundWrapper: React.FC<Props> = ({ children }) => {
    return (
        <div
            className={`
                min-h-screen
                bg-white
                md:bg-[url('/visa.webp')]
                md:bg-no-repeat
                md:bg-contain
                md:bg-right
            `}
        >
            <div className="min-h-screen p-4 bg-white/90">
                {children}
            </div>
        </div>
    );
};

export default PageBackgroundWrapper;
