import './App.scss';
import {Movies} from "./components/movies";
import {Route, Routes} from "react-router-dom";
import {MovieDetails} from "./components/movieDetails";
import {FavouriteMovies} from "./components/favouriteMovies";
import {PageNotFound} from "./components/pageNotFound";

function App() {
    return (
        <main className="container-sm">
            <Routes>
                <Route path="/" element={<Movies/>}/>
                <Route path="movie/:id" element={<MovieDetails/>}/>
                <Route path="favourite" element={<FavouriteMovies/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </main>
    );
}

export default App;
