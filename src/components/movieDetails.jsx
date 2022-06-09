import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {LikeComponent} from "./common/likeComponent";
import {isMovieLiked, setFavouriteMovies} from "../utils/tools";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../store/actions/movieActions";

export function MovieDetails() {
    const params = useParams();
    const id = params.id;

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const fetchMovieDetailsData = (id) => dispatch(actions.fetchMovieDetails(id));

    function findOutMovieLiked(id) {
        return isMovieLiked(id);
    }

    const movieDetails = useSelector(state => state.movies.movieDetails);
    const errorDetailsSearch = useSelector(state => state.movies.errorDetailsSearch);

    const [isLiked, setLikeValue] = useState(false);

    useEffect(() => {
        setLikeValue(findOutMovieLiked(id));

        fetchMovieDetailsData(id);
    })

    function createDetailsRow(key1, value1, key2, value2) {
        return (<div className="row">
            <div className="col-sm-4">
                <div className="row">
                    <div className="col-md-6">
                        <label><b>{key1}</b></label>
                    </div>
                    <div className="col-md-6">
                        <p>{value1}</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="row">
                    <div className="col-md-6">
                        <label><b>{key2}</b></label>
                    </div>
                    <div className="col-md-6">
                        <p>{value2}</p>
                    </div>
                </div>
            </div>
        </div>);
    }

    function createDetailsPlotRow(key, value) {
        return (<div className="row">
            <div className="col-sm-8">
                <div className="row">
                    <div className="col-md-3">
                        <label><b>{key}</b></label>
                    </div>
                    <div className="col-md-8">
                        <p>{value}</p>
                    </div>
                </div>
            </div>
        </div>);
    }

    function handleLikeMovieClick(like) {
        const likedMovie = {
            Title: movieDetails.Title, Year: movieDetails.Year, imdbID: movieDetails.imdbID, Type: movieDetails.Type,
        };

        setFavouriteMovies(likedMovie, like);
    }

    function createDetailsImageRow() {
        return (<div className="row" style={{marginBottom: '2rem'}}>
            <div className="col-sm-4">
                <div className="row">
                    <div className="col-md-6">
                        <img src={movieDetails.Poster} alt="movie pic"/>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="row">
                    <div className="col-md-7">
                        <LikeComponent isLiked={isLiked} onLikeMovieClick={handleLikeMovieClick}/>
                    </div>
                    <div className="col-md-6">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>);
    }

    function onBackSearch() {
        navigation("/");
    }

    return (<div>
        {errorDetailsSearch &&
            <h3 style={{marginTop: '2rem', paddingLeft: '0.5rem', color: 'red'}}>{errorDetailsSearch}</h3>}
        {!errorDetailsSearch && <div className="row">
            <div className="col-md-4">
                <h1 style={{marginTop: '2rem', marginBottom: '2rem'}}>Movie details</h1>
            </div>
            <div className="col-md-2">
                <div data-bs-toggle="tooltip" title="Back to Search" className="back-search-icon"
                     onClick={() => onBackSearch()}></div>
            </div>
        </div>}

        {!errorDetailsSearch && createDetailsImageRow()}
        {!errorDetailsSearch && createDetailsRow('Title', movieDetails.Title, 'Year', movieDetails.Year, true)}
        {!errorDetailsSearch && createDetailsRow('Genre', movieDetails.Genre, 'Released', movieDetails.Released)}
        {!errorDetailsSearch && createDetailsRow('Director', movieDetails.Director, 'Runtime', movieDetails.Runtime)}
        {!errorDetailsSearch && createDetailsRow('Writer', movieDetails.Writer, 'Language', movieDetails.Language)}
        {!errorDetailsSearch && createDetailsRow('Actors', movieDetails.Actors, 'Country', movieDetails.Country)}
        {!errorDetailsSearch && createDetailsRow('Awards', movieDetails.Awards, 'IMDB Ranting', movieDetails.imdbRating)}
        {!errorDetailsSearch && createDetailsPlotRow('Plot', movieDetails.Plot)}
    </div>);
}