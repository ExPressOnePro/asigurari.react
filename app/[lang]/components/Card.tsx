// /app/[lang]/components/Card.tsx

import Link from "next/link";

interface CardProps {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

const Card = ({ image, title, description, buttonText, link }: CardProps) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link href={link} className="text-blue-600 hover:text-blue-800 font-semibold">
                {buttonText}
            </Link>
        </div>
    </div>
);

export default Card;
