import React from 'react';

interface QRCodeImageProps {
    qrImageData: string;
    url: string;
}

const QRCodeImage: React.FC<QRCodeImageProps> = ({ qrImageData, url }) => {
    if (!qrImageData) {
        return null;
    }

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl p-6">
                <div className="mt-4 text-center ">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={qrImageData}
                            alt="QR Код"
                            className="w-2/3 h-2/3 border border-gray-300 rounded-3xl cursor-pointer mx-auto"
                        />
                    </a>
                    <h1 className="text-3xl sm:text-2xl font-extrabold text-ce text-gray-600 mt-6">Отсканируй и Оплати</h1>
                    <p className="mt-4 text-center font-bold">
                        отсканируй этот QR-код с помощью камеры телефона или финансового приложения и заверши платеж
                    </p>
                </div>
            </div>
        </div>

    );
};

export default QRCodeImage;
