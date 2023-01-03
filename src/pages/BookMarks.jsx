import React, { useState } from 'react'
import Save from '../components/Save'
import UnSavePop from '../components/UnSavePop';
import saveImg from '../assets/saveImg.gif'

export default function BookMarks({allSave, setAllSave}) {

  const [save, setSave] = useState(false)

  return (
    <div className='book-mark'>
        {
          allSave.map((save,i)=>{
              return <Save id={i} fromLang={save[1]} intoLang={save[0]}
                       fromText={save[2]} intoText={save[3]} setAllBookmarks={setAllSave} setSave={setSave} />
          })
        }
        <UnSavePop isUnSave={save} />
        <div className="empty" style={{display : allSave.length != 0 ? 'none' : 'block'}}>
            <img src={saveImg}  />
            <p>Oops, you don't have any saved stuff</p>
        </div>
    </div>
  )
}
