const API_KEY = "db9206e6a262ede625a297c59a3abcd7";
const BASE_URL = "https://api.themoviedb.org/3";


export const getpopularMovies = async () =>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}


export const getSearchMovies = async (query) =>{
 const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );    const data = await response.json();
    return data.results;
}
