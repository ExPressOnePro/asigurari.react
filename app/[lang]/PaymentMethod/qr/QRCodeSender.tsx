import axiosInstance from "@/lib/axiosInstance.ts";
import React, {useEffect} from "react";

interface QRCodeSenderProps {
    postUrl: string;
    payloadBuilder: () => any;
    dependencies: any[];
    onQrCodeDataChange: (data: any) => void;
}

const QRCodeSender: React.FC<QRCodeSenderProps> = React.memo(
    ({ postUrl, payloadBuilder, dependencies, onQrCodeDataChange }) => {
        const isSent = React.useRef(false);

        useEffect(() => {
            const sendRequest = async () => {
                if (isSent.current) return;

                const hasAllDeps = dependencies.every(dep => dep !== undefined && dep !== null);
                if (!hasAllDeps) return;

                isSent.current = true;

                try {
                    const payload = payloadBuilder();
                    console.debug("📤 QR Request Payload:", payload);

                    const { data } = await axiosInstance.post(postUrl, payload);
                    console.debug("✅ QR Response:", data);

                    if (data?.uuid) {
                        onQrCodeDataChange({
                            uuid: data.uuid,
                            qr_as_image: data.qr_as_image,
                            url: data.url,
                            status: data.status,
                        });
                    } else {
                        console.error("❌ Некорректный ответ API:", data);
                    }
                } catch (error) {
                    console.error("🚨 Ошибка при отправке QR-запроса:", error);
                }
            };

            sendRequest();
        }, [postUrl, payloadBuilder, onQrCodeDataChange, ...dependencies]);

        return null;
    }
);

export default QRCodeSender;
