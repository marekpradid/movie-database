import * as actionTypes from './actionTypes';
import clientService from "../../services/clientService";

export const dispatchTitle = (title) => async (dispatch) => {
    try {
        if (title) {
            dispatch({type: actionTypes.DISPATCH_TITLE, title});
        }
    } catch (err) {
        throw new Error('Failed to dispatch title');
    }
};

export const dispatchCurrentPage = (page) => async (dispatch) => {
    try {
        if (page) {
            dispatch({type: actionTypes.DISPATCH_CURRENT_PAGE, page});
        }
    } catch (err) {
        throw new Error('Failed to dispatch title');
    }
};

export const fetchMovies = (title, currentPage) => async (dispatch) => {
    try {
        const data = await clientService.getMoviesByTitle(title, currentPage);

        if (data.Response === "False") {
            dispatch({type: actionTypes.FETCH_MOVIES_ERROR, data});
            return;
        }

        dispatch({type: actionTypes.FETCH_MOVIES, data});
    } catch (err) {
        throw new Error('Movies fetch failed');
    }
};

export const fetchMovieDetails = (id) => async (dispatch) => {
    try {
        const data = await clientService.getMovieDetails(id);

        if (data.Response === "False") {
           dispatch({type: actionTypes.FETCH_MOVIE_DETAILS_ERROR, data});
            return;
        }

        dispatch({type: actionTypes.FETCH_MOVIE_DETAILS, data});
    } catch (err) {
        throw new Error('Movie details fetch failed');
    }
};
