import twitter from '/twitter.svg'
import github from '/github.svg'
import reddit from '/reddit.svg'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import i18next from 'i18next'

type Inputs = {
  name: string,
  lang: "en" | "fr"
}

function App() {
  const { t } = useTranslation()
  const location = useLocation()
  const langQuery = new URLSearchParams(location.search).get("lang") || "en"

  useEffect(() => {
    i18next.changeLanguage(langQuery)
  }, [langQuery])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`/person/${data.name}?lang=${langQuery}`)
  }

  return (
  <main className="h-screen w-screen flex flex-col justify-center bg-black items-center text-white">
    <h1 className=' text-4xl md:text-5xl font-semibold mb-4'>{t('main_title')}</h1>
    <h1 className='text-xl md:text-2xl w-[27rem] text-center'>{t('main_desc')} <span className='italic font-extrabold text-blue-500'>{t('main_desc_span')}</span>{t('main_desc_next')}</h1>
    <form action="submit" className='mt-6 border p-4 h-64 flex flex-col items-center justify-center rounded-lg md:w-96 gap-2 border-neutral-800 mb-6 w-80' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className='text-xl w-full'>{t('input_label')}</label>
      <input type="text" id="name" placeholder="John Doe" className='bg-transparent border w-full p-1.5 rounded-lg border-neutral-800 placeholder:text-neutral-800' {...register("name", {required: true})}/>
      {errors.name && <span className=' text-red-500 font-semibold w-full'>{t('error_text')}</span>}
      <button type="submit" className='w-42 border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-2 text-lg mt-3'>{t('btn_text')}</button>
    </form>
    <h1 className='text-xl mb-4'>{t('author_text')}</h1>
    <div className='flex gap-5 items-center'>
      <a href="https://x.com/blob_travis" target='_blank' className='hover:bg-neutral-900 transition-all duration-200 border p-1.5 border-neutral-900 rounded-lg'>
      <img src={twitter} alt="twitter" />
      </a>
      <a href="https://github.com/travislicious" target='_blank' className='hover:bg-neutral-900 transition-all duration-200 border p-1.5 border-neutral-900 rounded-lg'>
      <img src={github} alt="github" />
      </a>
      <a href="https://www.reddit.com/user/YoungTrav1s/" target='_blank' className='hover:bg-neutral-900 transition-all duration-200 border p-1.5 border-neutral-900 rounded-lg'>
      <img src={reddit} alt="reddit" />
      </a>
    </div>
    <button type="submit" className='w-42 border rounded-lg text-white hover:bg-neutral-900 border-neutral-900 transition-colors duration-200 p-2 mt-6' onClick={() => navigate(langQuery === "en" ? "/?lang=fr" : "/?lang=en")}>{t('lang_change')}</button>
  </main>
  )
}

export default App
