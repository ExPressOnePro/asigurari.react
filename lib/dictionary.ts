// lib/dictionary.ts

import { Locale } from "@/i18n.config";

// Объект с динамическим импортом для каждого языка
const dictionaries = {
  en: import('@/dictionaries/en.json'),
  ro: import('@/dictionaries/ro.json'),
  ru: import('@/dictionaries/ru.json'),
};

// Загружаем словарь для выбранного языка
export const getDictionary = async (locale: Locale) => {
  const dictionaryModule = await dictionaries[locale]; // Просто обращаемся к промису для загрузки
  return dictionaryModule.default; // Получаем данные из default экспорта
};
