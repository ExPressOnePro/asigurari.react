// /app/[lang]/components/Card.tsx

import Link from "next/link";

interface CardProps {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

const Card = ({image, title, description, buttonText, link}: CardProps) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
        <img src={image} alt={title} className="w-full h-48 object-cover"/>
        <div className="p-6 flex flex-col flex-1">
            <div>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
            </div>
            <div className="mt-auto pt-4">
                <Link href={link} className="text-blue-600 hover:text-blue-800 font-semibold">
                    {buttonText}
                </Link>
            </div>
        </div>
    </div>
);

export default Card;
