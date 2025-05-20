import React from 'react';

type PaymentMethod = 'card' | 'qr';

interface Props {
    onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({ onSelect }: Props) {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-6">Выберите способ оплаты</h3>
            <div className="flex justify-center gap-8">
                <div
                    onClick={() => onSelect('card')}
                    className="w-60 h-60 flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-100 cursor-pointer"
                >
                    <div className="text-center">
                        <div className="text-4xl mb-2">💳</div>
                        <div className="text-lg font-medium">Оплата картой</div>
                    </div>
                </div>
                <div
                    onClick={() => onSelect('qr')}
                    className="w-60 h-60 flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-100 cursor-pointer"
                >
                    <div className="text-center">
                        <div className="text-4xl mb-2">📱</div>
                        <div className="text-lg font-medium">QR-код</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
