import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import TraitItem from "../components/TraitItem";
import download from '/download.png'
import whatsapp from '/whatsapp.png'
import copy from '/copy.png'

type Params = {
    name: string
}

export interface Person {
    name:   string;
    traits: Trait[];
}

export interface Trait {
    name: string,
    percent: number
}



function TraitsPage() {
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [person, setPerson] = useState<Person>()
    const params = useParams<Params>()
    const navigate = useNavigate()
    let totalScore = 15
    const { t } = useTranslation()
    const location = useLocation()
    const langQuery = new URLSearchParams(location.search).get("lang") || "en"
  
    useEffect(() => {
      i18next.changeLanguage(langQuery)
    }, [langQuery])
    
    const fetchData = async() => {
        try {
            setLoading(true)
            const url = `https://whoami-backend.vercel.app/traits/${params.name?.replace(" ", "%20")}`;
        
            const response = await fetch(url);
            const text = await response.text()
            console.log(JSON.parse(text).traits)
            setPerson(JSON.parse(text))
            setLoading(false)
            setIsError(false)
        } catch {
            setLoading(false)
            setIsError(true)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    if (false) {
        return (<main className="h-screen w-screen flex flex-col justify-center bg-black items-center text-white">
            <h1 className="text-3xl font-semibold animate-pulse">{t('loading_text')}</h1>
        </main>)
    }

    
    if (isError) {
        return (<main className="h-screen w-screen flex flex-col justify-center bg-black items-center text-white">
            <h1 className="text-3xl font-semibold w-full text-center">{t('error_txt')}</h1>
        </main>)
    }

    return (
        <main className="h-screen w-screen flex flex-col justify-center bg-black items-center text-white">
            
            <h1 className="text-3xl">{t('trait_parag')}<span className="text-3xl text-blue-500">{person ? person?.name : "XXXXX"}</span>.</h1>
            <div className="mt-6 border h-[30rem] flex flex-col items-center rounded-lg md:w-96 gap-2 border-neutral-800 mb-6 w-[28rem]">
            <ul className="w-full flex flex-col h-full overflow-auto p-7 gap-6 no-scrollbar scroll-smooth snap-y snap-center">
                { person?.traits.map((trait) => {
                    return (
                        <TraitItem traitName={trait.name} percent={trait.percent} lang={langQuery}/>
                    )
                })}
            </ul>
            </div>
            <div className="flex w-[28rem] items-center flex-col">
                <button className='w-auto rounded-lg text-black hover:bg-neutral-300 bg-white transition-colors duration-200 p-2.5 mt-2 text-xl'>{t('show_another_text')}</button>
                <div className="flex items-center gap-6">
                    <button className="w-auto border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-3 mt-6">
                        <img src={copy} alt="" width={20}/>
                    </button>
                    <button className="w-auto border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-3 mt-6">
                        <img src={whatsapp} alt="" width={20}/>
                    </button>
                    <button className="w-auto border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-3 mt-6">
                        <img src={download} alt="" width={20}/>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default TraitsPage