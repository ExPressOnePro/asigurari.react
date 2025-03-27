import React from "react";

interface CardTitleProps {
    title: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ title }) => {
    return (
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-8">
            {title}
        </h1>
    );
};

export default CardTitle;
