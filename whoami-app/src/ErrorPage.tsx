import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function ErrorPage() {
    const { t } = useTranslation()
    const location = useLocation()
    const langQuery = new URLSearchParams(location.search).get("lang") || "en"
  
    useEffect(() => {
      i18next.changeLanguage(langQuery)
    }, [langQuery])
    return (
        <main className="h-screen w-screen flex flex-col justify-center bg-black items-center text-white">
            <h1 className="text-3xl font-semibold animate-pulse">{t('loading_text')}</h1>
        </main>
    )
}