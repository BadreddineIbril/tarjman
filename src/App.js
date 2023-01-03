import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import BookMarks from './pages/BookMarks';
import Home from './pages/Home'
import Speech from './pages/Speech';
import Document from './pages/Document'

function App() {

  const [menu, setMenu] = useState('/')
  const [allSave, setAllSave] = useState([])

  return (
    <div className="App">
        <NavBar />
        <div className='context'>
            <SideBar menu={menu} setMenu={setMenu} />
            <Routes>
                <Route path="/" element={<Home setAllSave={setAllSave} />} />
                <Route path="/bookmarks" element={<BookMarks allSave={allSave} setAllSave={setAllSave} />} />
                <Route path="/speech" element={<Speech />} />
                <Route path='/document' element={<Document />} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
