import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
type Params = {
    name: string
}

export interface Person {
    name:   string;
    traits: Traits;
}

export interface Traits {
    confidence: number;
    smile:      number;
    cuteness:   number;
    love:       number;
    kindness:   number;
    anger:      number;
}



function TraitsPage() {
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState<Person>()
    const params = useParams<Params>()
    const navigate = useNavigate()
    let totalScore = 15
    const { t } = useTranslation()
    const location = useLocation()
    const langQuery = new URLSearchParams(location.search).get("lang") || "en"
    console.log(langQuery)
  
    useEffect(() => {
      i18next.changeLanguage(langQuery)
    }, [langQuery])
    
    const fetchData = async() => {
        try {
            setLoading(true)
            const url = `https://whoami-backend.vercel.app/traits/${params.name?.replace(" ", "%20")}`;
        
            const response = await fetch(url);
            const text = await response.text()
            console.log(JSON.parse(text))
            setPerson(JSON.parse(text))
            setLoading(false)
        } catch {
            alert("An error occurred. Please try again.")
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (<main className="h-screen w-screen flex flex-col justify-center bg-black items-center text-white">
            <h1 className="text-3xl font-semibold">{t('loading_text')}</h1>
        </main>)
    }

    return (
        <main className="h-screen w-screen flex flex-col justify-center bg-black items-center text-white">
            <h1>{t('trait_parag1')} <span>{person?.name}</span>.</h1>
            <div>
            <h1><span>{person?.name}</span>{t('trait_parag2')}</h1>
            <ul>
                <li> a confidence of {person?.traits.confidence} % -- <span className="italic">Pretty Good</span></li>
            </ul>
            <h1>{person?.name} got the rate of {totalScore / 6} %.</h1>
            </div>
            <div>
            <button>{t('show_another_text')}</button>
            </div>
        </main>
    )
}

export default TraitsPage