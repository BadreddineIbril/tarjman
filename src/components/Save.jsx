import React, { useState } from 'react'
import Lang from '../utils/Lang'

export default function Save({id ,fromText, intoText, fromLang, intoLang, setAllBookmarks, setSave}) {
    
    const unSave = (id) => {
        setAllBookmarks((current) =>
          current.filter((save, i) => i !== id)
        );
      };
    

  return (
    <div className='save-card' key={id}>
        <div className="top">
            <div className="from-to">
                <Lang langCode={fromLang} />
                <span class="material-symbols-outlined">chevron_right</span>
                <Lang langCode={intoLang} />
            </div>
            <button onClick={()=>{
                unSave(id)
                setSave(true)
                setTimeout(() => {
                    setSave(false)
                }, 1000);
            }}>
                <span class="material-symbols-outlined">bookmark_remove</span>
            </button>
        </div>
        <div className="text">
            <ul>
                <li>{fromText}</li>
            </ul>
            <hr />
            <ul style={{opacity: '.5'}}>
                <li>{intoText}</li>
            </ul>
        </div>
    </div>
  )
}
