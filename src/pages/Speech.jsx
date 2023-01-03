import React, {useState, useEffect} from 'react'
import Lang from '../utils/Lang'
import { fetchFromApi } from '../utils/getLanguages'
import '@splidejs/splide/dist/css/splide.min.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import SpeechText from '../components/SpeechText';

export default function Speech() {

    const [languages, setLanguages] = useState([])
    const [speechLang, setSpeechLang] = useState('en')

    useEffect(()=>{
        fetchFromApi('https://google-translate1.p.rapidapi.com/language/translate/v2/languages')
        .then((data)=>{
            setLanguages(data.data.languages)
        })
    },[0])

  return (
    <div className='speech'>
        <div className="select-lang">
            <label>Speech language : </label>
            <div className="all-lang">
                <Splide options={
                    {perPage : 10,
                    arrows : false,
                    pagination : false,
                    drage : "free",
                    autoWidth: true,
                    focus    : 'center',
                    }
                }>
                    {
                        languages.map(lang=>{
                            return <SplideSlide>
                                        <button 
                                            onClick={()=>{
                                                setSpeechLang(lang.language)
                                            }}
                                            style={{background : speechLang == lang.language ? "#356aff" : ''}}>
                                            <Lang langCode={lang.language} />
                                        </button>
                                    </SplideSlide>
                        })
                    }
                </Splide>
            </div>
        </div>
         <SpeechText speechLang={speechLang} />           
    </div>
  )
}
