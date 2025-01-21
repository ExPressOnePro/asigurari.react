// @ts-ignore
import axios from "axios";

const csrfToken =
    typeof window !== "undefined"
        ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        : null;

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        ...(csrfToken && { "X-CSRF-TOKEN": csrfToken }), // Условно добавляем CSRF токен
    },
    timeout: 100000,
});

// Интерцептор для обработки ответов и ошибок
axiosInstance.interceptors.response.use(
    (response: any) => response,
    (error: { response: any; message: any; }) => {
        console.error("Error Axios:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;