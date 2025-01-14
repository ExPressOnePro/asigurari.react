import React from "react";

interface SelectedVol2Props {
    insurerName: string;
    insurerPrimeSum: string;
}

const SelectedVol2: React.FC<SelectedVol2Props> = ({
                                                       insurerName,
                                                       insurerPrimeSum
                                                   }) => {
    return (
        <>
            <div className="flex items-center text-sm">
                <span className="text-gray-600 font-medium w-36">Страховщик:</span>
                <span className="text-gray-800 font-bold">{insurerName}</span>
            </div>

            <div className="flex items-center text-sm">
                <span className="text-gray-600 font-medium w-36">Цена страховки:</span>
                <span className="text-gray-800 font-bold">{insurerPrimeSum} MDL</span>
            </div>
        </>
    )
        ;
};

export default SelectedVol2;
