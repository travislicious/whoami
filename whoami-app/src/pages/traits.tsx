import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import TraitItem from "../components/TraitItem";

type Params = {
    name: string
}

export interface Person {
    name:   string;
    traits: number[];
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
    const traits = ["confidence", "smile", "cuteness"]
  
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
            <h1 className="text-3xl">{t('trait_parag')}<span className="text-3xl text-blue-500">{person?.name}</span>.</h1>
            <div className="mt-6 border h-[32rem] flex flex-col items-center rounded-lg md:w-96 gap-2 border-neutral-800 mb-6 w-96">
            <ul className="w-full flex flex-col h-full overflow-auto p-6 gap-6 no-scrollbar scroll-smooth snap-y snap-center">
                
                <TraitItem traitName="confidence" percent={100} lang={langQuery}/>
                <TraitItem traitName="confidence" percent={100} lang={langQuery}/>
                <TraitItem traitName="confidence" percent={100} lang={langQuery}/>
                <TraitItem traitName="confidence" percent={100} lang={langQuery}/>
                <TraitItem traitName="confidence" percent={100} lang={langQuery}/>
                <TraitItem traitName="confidence" percent={100} lang={langQuery}/>
            </ul>
            </div>
            <div>
                <button>Hello</button>
                <div></div>
            </div>
        </main>
    )
}

export default TraitsPage