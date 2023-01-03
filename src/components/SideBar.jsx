import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar({menu, setMenu}) {

    const sideData = [
        {
            name : 'Home',
            link : '/',
            icon : 'home_app_logo'
        },
        {
            name : 'Document',
            link : '/document',
            icon : 'description'
        },
        {
            name : 'Switch Vc',
            link : '/speech',
            icon : 'keyboard_voice'
        },
        {
            name : 'Bookmarks',
            link : '/bookmarks',
            icon : 'bookmark'
        }
    ]

  return (
    <div className='side-bar'>
        <ul>
            {
                sideData.map(btn=>{
                    return (
                        <li>
                            <Link to={btn.link}>
                                <button onClick={()=>{
                                    setMenu(btn.link)
                                }} style={{backgroundColor : window.location.pathname == btn.link ? "#356aff" : "transparent"}} >
                                    <span class="material-symbols-outlined">{btn.icon}</span><p>{btn.name}</p>
                                </button>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}
