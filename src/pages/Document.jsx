import React, { useState } from 'react'
import axios from 'axios'
import SelectLang from './SelectLang'
import { saveText } from '../utils/saveText'

export default function Document() {

  const [file, setFile] = useState('')
  const [size, setSize] = useState(0)
  const [name, setName] = useState('')
  const [isUploaded, setUploaded] = useState(false)
  const [translateValue, setTranslateValue] = useState('')
  const [intoLang, setIntoLang] = useState('ar')
  const [detectedLang, setDetectedLang] = useState('')
  const [download, setDownload] = useState(false)
  const [loader, setLoader] = useState(false)

  const header = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
  }

  function hundelUpload() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var file = document.querySelector('input[type=file]').files[0];
      var reader = new FileReader()

      var textFile = /text.*/;

      if (file.type.match(textFile)) {
         reader.onload = function (event) {
            setFile(event.target.result)
            setSize(file.size)
            setName(file.name)
            setUploaded(true)
         }
      } else {
            setFile("It doesn't seem to be a text file!")
      }
      reader.readAsText(file);

    } else {
      alert("Your browser is too old to support HTML5 File API");
    }
  }

  const translate = () => {
    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
          'to[0]': intoLang,
          'api-version': '3.0',
          profanityAction: 'NoAction',
          textType: 'plain'
        },
        headers: header,
        data: `[{"Text": "${file}" }]`
      };
      
      axios.request(options).then(function (response) {
          setTranslateValue(intoText => response.data[0].translations[0].text)
          setDetectedLang(detectedLang => response.data[0].detectedLanguage.language)
          setLoader(true)
      }).catch(function (error) {
        console.error(error);
      });
      setDownload(true)

    }

    // if(!loader){return 'Loading...'}

  return (
    <div className='document'>
        <SelectLang setIntoLang={setIntoLang} />
        <div className="upload">
            <div className="details" style={{display: isUploaded ? 'none' : 'block'}}>
                <h3>Choose a document</h3>
                <p>Upload a .txt file</p>
                <div className="file">
                    <input type="file" accept='.txt' onChange={hundelUpload} />
                    <button>Browse your computer</button>
                </div>
            </div>

            <div className="file-uploaded" style={{display: isUploaded ? 'block' : 'none'}}>
                  <div className="info">
                      <div>
                          <span class="material-symbols-outlined">description</span>
                          <div className="text">
                              <p>{name}</p>
                              <span>{size} Ko</span>
                          </div>
                      </div>
                      <button onClick={()=>{
                          setUploaded(false)
                          setFile('')
                          setName('')
                          setSize(0)
                          setDownload(false)
                          setTranslateValue('')
                      }}>
                          <span class="material-symbols-outlined">close</span>
                      </button>
                  </div>
                  <div className='translate-file'>
                      <button onClick={()=>{
                          if(download == false){
                              translate()
                          }else{
                              setDownload(true)
                              saveText(translateValue,`${detectedLang}-${intoLang}`)
                          }
                      }}>
                        {download == false ? 'Translate' : 'Download'}</button>
                  </div>
              </div>
        </div>
    </div>
  )
}
