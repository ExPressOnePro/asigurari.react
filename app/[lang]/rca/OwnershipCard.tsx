import React from "react";

interface OwnershipCardProps {
    ownershipData: {
        ownershipType: string;
        startDate: string;
        phone: string;
        email: string;
    };
}

const OwnershipCard: React.FC<OwnershipCardProps> = ({ ownershipData }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-700">Данные о собственности</h2>
            <ul className="mt-2 text-gray-600">
                <li><strong>Тип собственности:</strong> {ownershipData.ownershipType}</li>
                <li><strong>Дата начала:</strong> {ownershipData.startDate}</li>
                <li><strong>Телефон:</strong> {ownershipData.phone}</li>
                <li><strong>Email:</strong> {ownershipData.email}</li>
            </ul>
        </div>
    );
};

export default OwnershipCard;
