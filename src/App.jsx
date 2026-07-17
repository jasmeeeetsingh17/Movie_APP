import React, { useState, useEffect } from 'react'
import Search from './components/Search.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

  }, []);
  return (
    <>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt='Hero Img'></img>
          <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle </h1>
        </header>
      </div>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

    </>
  )
}

export default App
