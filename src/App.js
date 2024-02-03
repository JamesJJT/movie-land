import {useState, useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

function App (){
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch(process.env.REACT_APP_MOVIE_BASE_URL + `&s=${title}`);
        const data = await response.json();
        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies(searchTerm).then();
    },[]);
  return (
    <div className="app">
        <h1>Movie Land</h1>

        <div className="search">
            <input
                type="text"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value)}}
            />
            <img src={SearchIcon}
                 alt="Search"
                 onClick={(e) => {searchMovies(searchTerm)}}
            />
        </div>
        <div className="container">
            {movies?.length === 0 && <h2>Search for a movie above</h2>}
            {movies?.length > 0 && movies.map((movie) => (
                <MovieCard
                    movie={movie}
                    key={movie.imdbID}
                />
            ))}
        </div>
    </div>
  )};

export default App;
