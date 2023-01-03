import React from 'react'

export default function CopyPop({isCopy}) {

    const copyStyle = {
        opacity: 1,
        top: '12%',
        transform: 'translate(-50%,-50%) scale(1)',
        transition: 'transform 300ms cubic-bezier(0.18,0.89,0.43,1.19)'
    }
  return (
    <div className='copy-pop' style={isCopy ? copyStyle : {background : ''}}>
        <span class="material-symbols-outlined">fingerprint</span>
        <p>Translation copied</p>
    </div>
  )
}
