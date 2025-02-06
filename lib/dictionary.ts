import { Locale } from "@/i18n.config";

// Объект для динамической загрузки словарей
const dictionaries = {
  en: import('@/dictionaries/en.json'),
  ru: import('@/dictionaries/ru.json'),
  ro: import('@/dictionaries/ro.json'),
};

// Функция для загрузки словаря по языку
export const getDictionary = async (locale: Locale) => {
  const dictionaryModule = await dictionaries[locale];
  return dictionaryModule.default;
};
