import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getFavouriteMovies} from "../utils/tools";

export function FavouriteMovies() {
    function fetchFavouriteMovies() {
        return getFavouriteMovies();
    }

    const [favouriteMovies, setFavouriteMovies] = useState([]);

    useEffect(() => {
        setFavouriteMovies(fetchFavouriteMovies());
    }, [])

    const navigation = useNavigate();

    function onMovieClick(imdbID) {
        navigation("/movie/" + imdbID);
    }

    function onBackSearch() {
        navigation("/");
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <h2 style={{marginBottom: '2rem', marginTop: '2rem'}}>My favorite movies</h2>
                </div>
                <div className="col-md-2">
                    <div data-bs-toggle="tooltip" title="Back to Search" className="back-search-icon"
                         style={{marginTop: '1.5rem',  marginLeft: '-1rem'}} onClick={() => onBackSearch()}></div>
                </div>
            </div>

            {favouriteMovies.length === 0 &&
                <h5 className="size" style={{marginTop: '2rem', color: 'darkorange'}}> You haven't so far any favourite movies. <br/><br/>Please click on star icon at movie details.</h5>}
            {favouriteMovies.length > 0 && <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Year</th>
                    <th scope="col">Type</th>
                </tr>
                </thead>
                <tbody>
                {favouriteMovies.map(movie => (
                    <tr key={movie.imdbID} onClick={() => onMovieClick(movie.imdbID)}>
                        <td>{movie.Title}</td>
                        <td>{movie.Year}</td>
                        <td>{movie.Type}</td>
                    </tr>
                ))}
                </tbody>
            </table>}
        </div>
    );
}