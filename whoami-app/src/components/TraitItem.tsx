import React from "react"
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import help from '/help.png'
import CountUp from 'react-countup';
interface TraitsProps  {
    traitName: string,
    percent: number,
    lang: string
}

const TraitItem: React.FC<TraitsProps> = ({traitName, percent, lang}) => {
    const [description, setDescription] = useState("")
    const [appreciation, setAppreciation] = useState("")
    const { t } = useTranslation()

    useEffect(() => {
        i18next.changeLanguage(lang)
    }, [lang])

    useEffect(() => {
        getTraitData(traitName, 100)
    }, [])

    function getTraitData(name: string, percent: number) {
        switch (name) {
            case "confidence":
                setDescription(t('traits.confidence_txt'))
                break;
            case "smile":
                setDescription(t('traits.smile_txt'))
                break;
            case "love":
                setDescription(t('traits.love_txt'))
                break;
            case "anger":
                setDescription(t('traits.anger_txt'))
                break;
            case "cuteness":
                setDescription(t('traits.cuteness_txt'))
                break;
            case "kindness":
                setDescription(t('traits.kindness_txt'))
                break;
        }
    }
    return (
        <div className="w-full">
            <div>
                <div className="w-full flex gap-2 items-center">
                <h1 className="text-2xl font-semibold">{t(`traits_name.${traitName}`)}</h1>
                <img src={help} alt="" className="size-5 opacity-60 transition-all duration-200 cursor-pointer hover:opacity-0 peer"/>
                <h1 className="w-full opacity-0 transition-all peer-hover:opacity-100 duration-200 text-xl text-neutral-600 font-semibold text-right italic">{description}</h1>
                </div>
                <CountUp end={percent} suffix="%" className="text-6xl font-bold" duration={1.75} delay={0}/>
            </div>
            <h1 className="w-full text-xl mt-2 italic text-neutral-400">- Pas Mal.</h1>
        </div>
    )
}

export default TraitItem