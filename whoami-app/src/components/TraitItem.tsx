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
        getPercentData()
    }, [lang, percent])

    useEffect(() => {
        getTraitData()
    }, [])

    function getTraitData() {
        getPercentData()
        switch (traitName) {
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

    function getPercentData() {
        if (percent === 0) {
            setAppreciation(t('appreciations.0'))
        }
        else if (percent > 0 && percent < 10) {
            setAppreciation(t('appreciations.0'))
        }
        else if (percent >= 10 && percent < 20) {
            setAppreciation(t('appreciations.1'))
        }
        else if (percent >= 20 && percent < 30) {
            setAppreciation(t('appreciations.2'))
        }
        else if (percent >= 30 && percent < 40) {
            setAppreciation(t('appreciations.3'))
        }
        else if (percent >= 40 && percent < 50) {
            setAppreciation(t('appreciations.4'))
        }
        else if (percent >= 50 && percent < 60) {
            setAppreciation(t('appreciations.5'))
        }
        else if (percent >= 60 && percent < 70) {
            setAppreciation(t('appreciations.6'))
        }
        else if (percent >= 70 && percent < 80) {
            setAppreciation(t('appreciations.7'))
        }
        else if (percent >= 80 && percent < 90) {
            setAppreciation(t('appreciations.8'))
        }
        else if (percent >= 90 && percent < 100) {
            setAppreciation(t('appreciations.9'))
        }
        else if (percent === 100) {
            setAppreciation(t('appreciations.9'))
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
            <h1 className="w-full text-xl mt-2 italic text-neutral-400">- {appreciation}</h1>
        </div>
    )
}

export default TraitItem