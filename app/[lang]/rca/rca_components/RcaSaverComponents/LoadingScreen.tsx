export default function LoadingScreen({ title }: { title: string }) {
    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-400 mb-10">{title}</h1>
        </>
    );
}
