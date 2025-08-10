import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import { getSearchMovies, getpopularMovies } from '../services/api';
import "../css/Home.css";


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, seterror]= useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getpopularMovies();
                setMovies(popularMovies);
            }catch (error) {
                console.log(error);
                setError("Failed to fetch popular movies");
            }
            finally {
                setLoading(false);
            }

        }
        loadPopularMovies();
    }, []);

    // const movies = getpopularMovies();

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim())return;
        if(loading) return;

        setLoading(true);
        try{
            const searchResults = await getSearchMovies(searchQuery);
            setMovies(searchResults);
            seterror(null);
        }
        catch (error) {
            console.log(error);
            seterror("Failed to fetch search results");
        }
        finally {
            setLoading(false);
        }

    }


    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text"
                placeholder="Search for a movie..."
                className='search-input'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className='search-button'>Search</button>
        </form>


{error && <div className ="error-message">{error}</div>}



{loading ?(<div className ="Loading"></div> ):
        <div className="movies-grid">
            {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}

        </div>
}
    </div>
}


export default Home;