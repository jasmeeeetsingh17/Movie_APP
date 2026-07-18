import React, { useState, useEffect } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 500, [searchTerm]
  )


  const fetchMovies = async ({ query }) => {
    setIsLoading(true);
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        setMovieList([]);
        throw new Error('Failed to Fetch Movie');
      }
      const data = await response.json();

      setMovieList(data.results);
    }
    catch (error) {
      console.error(`Error Fetching movie :${error} `);
      setErrorMessage('Error in Fetching Movie !!');
      return;

    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies({ query: debouncedSearchTerm });
    console.log("Effect Ran !!");

  }, [debouncedSearchTerm]);
  return (
    <>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt='Hero Img'></img>
          <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="all-movies">
          <h2 className='text-white mt-5'>All Movies </h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard movie={movie} key={movie.id}></MovieCard>
              ))}
            </ul>
          )}
        </section>
      </div>


    </>
  )
}

export default App
