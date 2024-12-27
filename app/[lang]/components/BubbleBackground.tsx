import React from "react";

const BubbleBackground = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div className="oval" id="oval"></div>
        </div>
    );
};

export default BubbleBackground;
