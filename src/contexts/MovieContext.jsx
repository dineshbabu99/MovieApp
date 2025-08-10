import {createContext, useState, useEffect, useContext} from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);


export const MovieProvider = ({children}) => {
    const [favorites, setfavorites] =useState([]);

    useEffect(() => {
        const storeFavs = localStorage.getItem("favorites");
        if(storeFavs){
            setfavorites(JSON.parse(storeFavs)); 
        }

    },[])

   useEffect(()=> {
    localStorage.setItem("favorites", JSON.stringify(favorites));
   }, [favorites])

   const addToFavorites = (movie) => {
       setfavorites(prev => [...prev, movie]);
   }

   const removeFromFavorites = (movieId) => {
    setfavorites(prev => prev.filter(movie => movie.id !==movieId))
   }

   const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
   }

const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
};


    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}