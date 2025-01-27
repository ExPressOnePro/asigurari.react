import React, { useEffect, useState } from "react";

interface SkeletonLoaderFormProps {
}

const SkeletonLoaderForm: React.FC<SkeletonLoaderFormProps> = ({ }) => {
    const [formData, setFormData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg p-8 relative">
            {isLoading ? (
                <div className="space-y-4">
                    {/* Skeleton fields */}
                    <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded-md"></div>
                    <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded-md"></div>
                    <div className="h-10 bg-blue-300 rounded-md w-1/2"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">
                        </label>
                        <input
                            type="text"
                            name="field1"
                            value={formData?.field1 || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">
                        </label>
                        <input
                            type="text"
                            name="field2"
                            value={""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                    </button>
                </form>
            )}
        </div>
            </div>
        </div>
    );
};

export default SkeletonLoaderForm;
