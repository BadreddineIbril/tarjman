import React, { useState, useEffect } from 'react'
import From from '../components/From'
import Into from '../components/Into'
import axios from 'axios'
import TranslateDetail from '../components/TranslateDetail'

export default function Home({setAllSave}) {

  const [from, setFrom] = useState(['en','English'])
  const [into, setInto] = useState(['ar','Arabic'])
  const [fromText, setFromText] = useState('')
  const [intoText, setIntoText] = useState('')
  const [detectedLang, setDetectedLang] = useState('en')
  const [details, setDetails] = useState('')

  function switchLang() {
    setFrom(into)
    setInto(from)
    setFromText(intoText)
    setIntoText(fromText)
  }

  const header = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
  }

  const translate = () => {
    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
          'to[0]': into[0],
          'api-version': '3.0',
          profanityAction: 'NoAction',
          textType: 'plain'
        },
        headers: header,
        data: `[{"Text": "${fromText}" }]`
      };
      
      axios.request(options).then(function (response) {
          setIntoText(intoText => response.data[0].translations[0].text)
          setDetectedLang(detectedLang => response.data[0].detectedLanguage.language)
      })
    }
    translate()

    const getDetail = (text)=>{
      const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/Dictionary/Lookup',
        params: {to: from[0], 'api-version': '3.0', from: into[0]},
        headers: header,
        // data: `[{"Text":"${fromText}"}]`
        data: `[{"Text":"${text}"}]`
      };
      
      axios.request(options).then(function (response) {
        setDetails(detail => response.data)
      })
    }

  return (
    <div className='home'> 
        <div className="feed">
            <From 
              translatedText={from}
              setTranslatedText={setFrom}
              otherTranslatedText={into[0]}
              setFromText={setFromText}
              setIntoText={setIntoText}
              fromText={fromText}
              translate={translate}
              detectedLang={detectedLang}
              getDetail = {getDetail}
            />
            <div className="actions">
                <button onClick={switchLang}><span class="material-symbols-outlined">sync_alt</span></button>
                <button onClick={translate} style={{visibility:'hidden'}}><span class="material-symbols-outlined">translate</span></button>
            </div>
            <Into 
              translatedText={into}
              setTranslatedText={setInto} 
              otherTranslatedText={from[0]} 
              intoText={intoText}
              fromText={fromText}
              setAllSave={setAllSave}
              />
        </div>
        {
          details != ''  &&  (details[0].translations !== null && <TranslateDetail details={details} /> )
        }
    </div>
  )
}
