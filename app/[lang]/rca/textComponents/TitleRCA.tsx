import React from "react";
import {useLocalization} from "@/lib/LocalizationProvider.tsx";

export default function TitleRCA(){
    const { dictionary } = useLocalization();
  return (
      <div className="flex-grow flex justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-ce text-gray-600 mb-6">
                  {dictionary?.osago?.Title || ""}
              </h1>
          </div>
      </div>
  )
}