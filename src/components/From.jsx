import React, { useEffect, useState } from 'react'
import { fetchFromApi } from '../utils/getLanguages'
import Lang from '../utils/Lang'
import { useSpeechSynthesis } from 'react-speech-kit'

export default function From({translatedText, setTranslatedText, otherTranslatedText, setFromText, setIntoText, fromText, translate, detectedLang, getDetail}) {

    const [textFrom, setTextFrom] = useState(fromText)
    const [openListChange, setOpenListChange] = useState(false)
    const [languages, setLanguages] = useState([])
    const {speak, voices} = useSpeechSynthesis()
    const [voice, setVoice] = useState('en')
    const voiceLang = ['fr','','','de','','','en','es','','','hi','id','it','ja','ko','nl','pl','pt','ru','zh','','']
    const [searchLang, setSearchLang] = useState('')
  
    const listOfLanguages = {
        opacity: 1,
        top: '50%',
        transform: 'translate(-50%,-50%) scale(1)',
        transition: 'transform 300ms cubic-bezier(0.18,0.89,0.43,1.19)'
    }

    function handleVoice() {
        for (let i = 0; i < voices.length; i++) {
            if(translatedText[0] == voiceLang[i]){
                setVoice(voices[i])
            }
        }
    }

    useEffect(()=>{
        fetchFromApi('https://google-translate1.p.rapidapi.com/language/translate/v2/languages')
        .then((data)=>{
            setLanguages(data.data.languages)
        })
        handleVoice()
    },[0])

    function handelSearch(text) {
        document.querySelectorAll('button').forEach(element => {
            if(element.id != '' ){
                element.innerText.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ?
                 element.style.display = 'block' : element.style.display = 'none' 
            }
        });
    }
    

  return (
    <div className='from translate-feed'>
        <div className="choose">
            <label>From : </label>
            <button onClick={()=>{
                setOpenListChange(true)
            }}>
                <div>
                    <span class="material-symbols-outlined">language</span>
                    <p>{translatedText[1]}</p>
                </div>
                <span class="material-symbols-outlined">expand_more</span>
            </button>
        </div>
        <div className="text">
            <textarea maxLength={5000} id="" cols="30" rows="10" value={fromText} placeholder='Type your text...' onChange={(e)=>{
                setTextFrom(textFrom => e.target.value)
                setFromText(textFrom => e.target.value)
                translate()
                getDetail(e.target.value)
            }}></textarea>
            <button style={{visibility: textFrom.length != 0 ? 'visible' : 'hidden'}} onClick={()=>{
                setTextFrom('')
                setFromText('')
                setIntoText('')
                getDetail('')
            }}>
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        {
            (detectedLang != translatedText[0] && fromText != '') && <div className="detect">
                <span class="material-symbols-outlined">magic_button</span>
                <p>Source language :</p>
                <button onClick={()=>{
                    setTranslatedText([detectedLang, document.querySelector(`.${detectedLang}`).innerText])
                }}><Lang langCode={detectedLang} /></button>
            </div>
        }

        <div className="more">
            <button onClick={()=>{
                handleVoice()
                speak({text:fromText, voice})
            }}><span class="material-symbols-outlined">volume_up</span></button>
            <p className="length">{textFrom.length} / 5000</p>
        </div>

        <div className="lang" style={openListChange ? listOfLanguages : {background : ''}}>
            <div className="top">
                <div className="search">
                    <input type="text" placeholder='Search for a language' value={searchLang} onChange={(e)=>{
                        setSearchLang(old => e.target.value)
                        handelSearch(e.target.value)
                    }} />
                    <button><span class="material-symbols-outlined">search</span></button>
                </div>
                <button className='close' onClick={()=>{
                    setOpenListChange(false)
                }}><span class="material-symbols-outlined">close</span></button>
            </div>
            <div className="all">
                {
                    languages.map((lang,i)=>{
                        return <button id={i} className={lang.language} onClick={()=>{
                                    setTranslatedText([lang.language, document.getElementById(i).innerText])
                                }}
                                    style={{background: translatedText[0] == lang.language ? '#1c1b20' : otherTranslatedText == lang.language ? '#356aff' : '',
                                }}
                                    disabled={otherTranslatedText == lang.language ? true : false}
                                    >{<Lang langCode={lang.language} />}
                                </button>
                    })
                }
                
            </div>
        </div>
    </div>
  )
}
