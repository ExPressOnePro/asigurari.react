import { useState } from "react";

export default function EmailSendForm({ onSend, sending }: any) {
    const [email, setEmail] = useState("");

    return (
        <div className="mt-4 flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите вашу почту"
                className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button onClick={onSend} disabled={sending} className={`px-4 py-2 text-white font-medium rounded-lg shadow transition ${sending ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}>
                {sending ? "Отправка..." : "Отправить"}
            </button>
        </div>
    );
}
