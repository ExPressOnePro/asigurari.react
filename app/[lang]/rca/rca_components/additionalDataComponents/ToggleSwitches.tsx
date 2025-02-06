import React, {useState} from "react";


export default function ToggleSwitches(){
    const [isFromTransnistria, setIsFromTransnistria] = useState<boolean>(false);
    const [personIsExternal, setPersonIsExternal] = useState<boolean>(false);
    const handleIsFromTransnistriaChange = () => {
        if (isFromTransnistria) {
            setIsFromTransnistria(false); // Reset if already active
        } else {
            setIsFromTransnistria(true); // Activate
            setPersonIsExternal(false); // Deactivate the other
        }
    };

    const handlePersonIsExternalChange = () => {
        if (personIsExternal) {
            setPersonIsExternal(false); // Reset if already active
        } else {
            setPersonIsExternal(true); // Activate
            setIsFromTransnistria(false); // Deactivate the other
        }
    };

    return (
        <>
        {!isFromTransnistria && !personIsExternal && (
        <div className="text-sm text-gray-500 mb-6">
            Выберите если вы не являетесь резидентом Республики Молдова
            {/*{dictionary?.osago?.InsurerList.InsurerStatus.Available}*/}
        </div>
    )}

    {/* Toggle Switches for exclusive selection */}
    <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-4">
            <label htmlFor="IsFromTransnistria" className="text-sm font-medium text-gray-700">
                Из Приднестровья
            </label>
            <div
                className="relative inline-flex items-center cursor-pointer"
                onClick={handleIsFromTransnistriaChange}
            >
                <input
                    type="checkbox"
                    id="IsFromTransnistria"
                    checked={isFromTransnistria}
                    onChange={handleIsFromTransnistriaChange}
                    className="sr-only"
                />
                <div
                    className={`w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
                        isFromTransnistria ? "bg-orange-500" : "bg-gray-200"
                    }`}
                >
                    <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                            isFromTransnistria ? "translate-x-6" : "translate-x-0"
                        }`}
                    ></div>
                </div>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <label htmlFor="PersonIsExternal" className="text-sm font-medium text-gray-700">
                Иностранное лицо
            </label>
            <div
                className="relative inline-flex items-center cursor-pointer"
                onClick={handlePersonIsExternalChange}
            >
                <input
                    type="checkbox"
                    id="PersonIsExternal"
                    checked={personIsExternal}
                    onChange={handlePersonIsExternalChange}
                    className="sr-only"
                />
                <div
                    className={`w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
                        personIsExternal ? "bg-orange-500" : "bg-gray-200"
                    }`}
                >
                    <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                            personIsExternal ? "translate-x-6" : "translate-x-0"
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}