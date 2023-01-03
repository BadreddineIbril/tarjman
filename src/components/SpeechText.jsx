import React, { useState } from 'react'
import CopyPop from './CopyPop';
import {saveText} from '../utils/saveText';

export default function SpeechText({speechLang}) {

    const [speechValue, setSpeechValue] = useState('')
    const [record, setRecord] = useState(true)
    const [copy, setCopy] = useState(false)
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition, recognition, recording = false;
    recognition = new SpeechRecognition();
    recognition.lang = speechLang
    
    function speechToText() {
        try {
          recognition.interimResults = true;
          recognition.start();
          recognition.onresult = (e) => {
            const transcript = Array.from(e.results).map(result =>result[0]).map(result =>result.transcript)
              setSpeechValue(old => speechValue +' '+  transcript)
          };
          recognition.onspeechend = () => {
            speechToText();
            setRecord(true)
          };
          recognition.onerror = (event) => {
            stopRecording();
            if (event.error === "no-speech") {
                setRecord(true)
            //   alert("No speech was detected. Stopping...");
            } 
          };
        } catch (error) {
          recording = false;
        }
    }
    function stopRecording() {
        recognition.stop();
        recording = false;
      }

  return (
    <div className='speech-text'>
        <div className="speech-control">
            <button onClick={()=>{
                setRecord(!record)
                speechToText()
                record == false && stopRecording()
            }}
            >
                <span class="material-symbols-outlined">{!record ? 'graphic_eq' : 'mic'}</span>
                {!record ? <p>Listening...</p> : ''}
            </button>
        </div>
        <div className="remove">
            <button onClick={()=>{
                        setSpeechValue('')
                    }} style={{visibility: speechValue.length > 0 ? 'visible' : 'hidden'}}>
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <textarea id="" cols="30" rows="10" placeholder='Speak now...' disabled value={speechValue}></textarea>
        <div className="info">
            <div className="btn">
                <button 
                    style={{visibility: speechValue.length > 0 ? 'visible' : 'hidden'}}
                    onClick={()=>{
                    saveText(speechValue,'')
                }}>
                    <span class="material-symbols-outlined">south</span>
                </button>
                <button 
                    style={{visibility: speechValue.length > 0 ? 'visible' : 'hidden'}}
                    onClick={()=>{
                        navigator.clipboard.writeText(speechValue);
                        setCopy(true)
                        setTimeout(() => {
                            setCopy(false)
                        }, 2000);
                }}>
                    <span class="material-symbols-outlined">content_copy</span>
                </button>
            </div>
            <p>{speechValue.length} / 5000</p>
        </div>
        <CopyPop isCopy={copy} />
    </div>
  )
}
