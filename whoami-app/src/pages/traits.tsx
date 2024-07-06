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
    img_data: string
}

export interface Trait {
    name: string,
    percent: number
}



function TraitsPage() {
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [person, setPerson] = useState<Person>()
    const [copyTxt, setCopyTxt] = useState("")
    const [statutTxt, setStatutTxt] = useState("")
    const [imgData, setImgData] = useState("")
    const params = useParams<Params>()
    const navigate = useNavigate()
    const [totalPercent, setTotalPercent] = useState(0)
    const { t } = useTranslation()
    const location = useLocation()
    const langQuery = new URLSearchParams(location.search).get("lang") || "en"
  
    useEffect(() => {
      i18next.changeLanguage(langQuery)
    }, [langQuery])
    
    const fetchData = async() => {
        try {
            setLoading(true)
            const url = `https://whoami-1.onrender.com/person/${params.name?.replace(" ", "%20")}?lang=${langQuery}`;
        
            const response = await fetch(url);
            const text = await response.text()
            setPerson(JSON.parse(text))
            setImgData(JSON.parse(text).img_data)
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
    
    useEffect(() => {
        if (person) {
            calculateTotal()
        }
    })

    function calculateTotal() {
        let total = 0
        let calculatedPercent = 0
        person?.traits.map((trait) => {
            total = total + trait.percent
        })
        calculatedPercent = total / 6
        calculatedPercent = Math.round(calculatedPercent)
        setTotalPercent(calculatedPercent)

        setCopyTxt(langQuery === "fr" ? `*Traits de ${person?.name}.*\n*Confiance:* ${person?.traits[0].percent}\n*Sourire*: ${person?.traits[1].percent}\n*Mignonnerie*: ${person?.traits[2].percent}\n*Amour*: ${person?.traits[3].percent}\n*Gentillesse*: ${person?.traits[4].percent}\n*Colère*: ${person?.traits[5].percent}\n\n*Total*: ${totalPercent}`: `*${person?.name}'s Traits.*\n*Confidence*: ${person?.traits[0].percent}\n*Smile*: ${person?.traits[1].percent}\n*Cuteness*: ${person?.traits[2].percent}\n*Love*: ${person?.traits[3].percent}\n*Kindness*: ${person?.traits[4].percent}\n*Anger*: ${person?.traits[5].percent}\n\n*Total:* ${totalPercent}`)

        setStatutTxt(langQuery === "fr" ? `whatsapp://send?text=*Traits de ${person?.name}.*\n*Confiance:* ${person?.traits[0].percent}\n*Sourire*: ${person?.traits[1].percent}\n*Mignonnerie*: ${person?.traits[2].percent}\n*Amour*: ${person?.traits[3].percent}\n*Gentillesse*: ${person?.traits[4].percent}\n*Colère*: ${person?.traits[5].percent}\n\n*Total*: ${totalPercent}`: `whatsapp://send?text=*${person?.name}'s Traits.*\n*Confidence*: ${person?.traits[0].percent}\n*Smile*: ${person?.traits[1].percent}\n*Cuteness*: ${person?.traits[2].percent}\n*Love*: ${person?.traits[3].percent}\n*Kindness*: ${person?.traits[4].percent}\n*Anger*: ${person?.traits[5].percent}\n\n*Total:* ${totalPercent}`)
    }
    
    if (loading) {
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
            
            {langQuery === 'fr' ? <h1 className="text-3xl">{t('trait_parag')}<span className="text-3xl text-blue-500">{person ? person?.name : "XXXXX"}</span>.</h1>: <h1 className="text-3xl"><span className="text-3xl text-blue-500">{person ? person?.name : "XXXXX"}'s</span>{t('trait_parag')}.</h1>}
            <div className="mt-6 border h-[30rem] flex flex-col items-center rounded-lg gap-2 border-neutral-800 mb-6 w-[28rem]">
            <ul className="w-full flex flex-col h-full overflow-auto p-7 gap-6 no-scrollbar scroll-smooth snap-y snap-center">
                { person?.traits.map((trait) => {
                    return (
                        <TraitItem traitName={trait.name} percent={trait.percent} lang={langQuery}/>
                    )
                })}
                <h1 className="text-2xl w-full text-center font-semibold">{t('total_txt_1')}<span className="text-blue-500">{person?.name}</span>{t('total_txt_2')}:</h1>
                <h1 className="text-8xl font-bold w-full text-center">{totalPercent}%</h1>
            </ul>
            <div>
            </div>
            </div>
            <div className="flex w-[28rem] items-center flex-col">
                <button className='w-auto rounded-lg text-black hover:bg-neutral-300 bg-white transition-colors duration-200 p-2.5 mt-2 text-xl' onClick={() => navigate(`/?lang=${langQuery}`)}>{t('show_another_text')}</button>
                <div className="flex items-center gap-6">
                    <button className="w-auto border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-3 mt-6" onClick={()=> {
                        navigator.clipboard.writeText(copyTxt)
                        alert(t('copy_msg'))
                    }}>
                        <img src={copy} alt="" width={20}/>
                    </button>
                    <button className="w-auto border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-3 mt-6" onClick={() => window.location.href = statutTxt}>
                        <img src={whatsapp} alt="" width={20}/>
                    </button>
                    <a download={`${person?.name}-traits.png`} href={imgData} className="w-auto border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-3 mt-6">
                        <img src={download} alt="" width={20}/>
                    </a>
                </div>
            </div>
        </main>
    )
}

export default TraitsPage