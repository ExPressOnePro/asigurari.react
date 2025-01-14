import React from "react";

interface SelectedVol3Props {
    ownershipType: string;
    startDate: string;
    phone: string;
    email: string;
}

const SelectedVol3: React.FC<SelectedVol3Props> = ({
                                                       ownershipType,
                                                       startDate,
                                                       phone,
                                                       email
                                                   }) => {
    return (
        <>
            <div className="flex items-center text-sm">
                <span className="text-gray-600 font-medium w-36">Тип владения:</span>
                <span className="text-gray-800 font-bold">{ownershipType}</span>
            </div>
            <div className="flex items-center text-sm">
                <span className="text-gray-600 font-medium w-36">Дата начала:</span>
                <span className="text-gray-800 font-bold">{startDate}</span>
            </div>
            <div className="flex items-center text-sm">
                <span className="text-gray-600 font-medium w-36">Телефон:</span>
                <span className="text-gray-800 font-bold">{phone}</span>
            </div>
            <div className="flex items-center text-sm">
                <span className="text-gray-600 font-medium w-36">Email:</span>
                <span className="text-gray-800 font-bold">{email}</span>
            </div>
        </>
    );
};

export default SelectedVol3;
