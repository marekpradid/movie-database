import './App.scss';
import {Movies} from "./components/movies";
import {Route, Routes} from "react-router-dom";
import {MovieDetails} from "./components/movieDetails";
import {FavouriteMovies} from "./components/favouriteMovies";

function App() {
    return (
        <main className="container-sm">
            <Routes>
                <Route path="/" element={<Movies/>}/>
                <Route path="movie/:id" element={<MovieDetails/>}/>
                <Route path="favourite" element={<FavouriteMovies/>}/>
            </Routes>
        </main>
    );
}

export default App;
