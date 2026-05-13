"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "@/lib/i18n/translations";

type TranslationSet = (typeof translations)[Locale];

const LanguageContext = createContext<{
  locale: Locale;
  t: TranslationSet;
  toggle: () => void;
}>({
  locale: "pt",
  t: translations.pt,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored === "pt" || stored === "fr") {
      setLocale(stored);
    }
  }, []);

  function toggle() {
    setLocale((prev) => {
      const next = prev === "pt" ? "fr" : "pt";
      localStorage.setItem("locale", next);
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
