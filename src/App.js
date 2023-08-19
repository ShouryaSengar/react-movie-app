import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=5baa7886";
//USE https instead of http to make the API work
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        // setError("Please enter a search term.");
        // searchMovies("Spiderman");
    }, [searchTerm]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchMovies(searchTerm);
        }
    };

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for a movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0 ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.imdbID} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
};

export default App;
