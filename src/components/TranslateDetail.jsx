import React, { useState } from 'react'

export default function TranslateDetail({details}) {

return (
    <div className='translate-detail' style={{display : details[0].translations.length > 0 ? 'flex' : 'none'}}>
        <div className="synonyme detail">
            <h3>Synonyme de <span>" {details[0].displaySource } "</span></h3>
            <ul>
                <li>{details[0].translations.length > 0 && details[0].translations[0].displayTarget}</li>
            </ul>
        </div>
        <div className="more detail">
            <h3>Translations of <span>" {details[0].displaySource} "</span></h3>
            <ul>
                {
                    details[0].translations.length > 0 &&
                    details[0].translations[0].backTranslations.map(text=>{
                        return <li>{text.displayText}</li>
                    })
                }
            </ul>
        </div>
    </div>
  )
}
