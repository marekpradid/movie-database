import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isSearchPressed: false,
    searchTitle: "",
    currentPage: 1,
    moviesData: [],
    totalResults: 0,
    movieDetails: {},
    errorSearch: "",
    errorDetailsSearch: ""
};

export default function movieReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES:
            return {
                isSearchPressed: true,
                searchTitle: state.searchTitle,
                currentPage: state.currentPage,
                moviesData: action.data.Search,
                totalResults: action.data.totalResults,
                movieDetails: state.movieDetails,
                errorSearch: "",
                errorDetailsSearch: ""
            };
        case actionTypes.FETCH_MOVIES_ERROR:
            return {
                isSearchPressed: true,
                searchTitle: state.searchTitle,
                currentPage: 1,
                moviesData: [],
                totalResults: 0,
                movieDetails: {},
                errorSearch: action.data.Error,
                errorDetailsSearch: ""
            };

        case actionTypes.FETCH_MOVIE_DETAILS:
            return {
                isSearchPressed: state.isSearchPressed,
                searchTitle: state.searchTitle,
                currentPage: state.currentPage,
                moviesData: state.moviesData,
                totalResults: state.totalResults,
                movieDetails: action.data,
                errorSearch: "",
                errorDetailsSearch: ""
            };
        case actionTypes.FETCH_MOVIE_DETAILS_ERROR:
            return {
                isSearchPressed: state.isSearchPressed,
                searchTitle: state.searchTitle,
                currentPage: state.currentPage,
                moviesData: state.moviesData,
                totalResults: state.totalResults,
                movieDetails: {},
                errorSearch: "",
                errorDetailsSearch: action.data.Error
            };
        case actionTypes.DISPATCH_TITLE:
            return {
                isSearchPressed: state.isSearchPressed,
                searchTitle: action.title,
                currentPage: state.currentPage,
                moviesData: state.moviesData,
                totalResults: state.totalResults,
                movieDetails: state.movieDetails,
                errorSearch: "",
                errorDetailsSearch: ""
            };
        case actionTypes.DISPATCH_CURRENT_PAGE:
            return {
                isSearchPressed: state.isSearchPressed,
                searchTitle: state.searchTitle,
                currentPage: action.page,
                moviesData: state.moviesData,
                totalResults: state.totalResults,
                movieDetails: state.movieDetails,
                errorSearch: "",
                errorDetailsSearch: ""
            };

        default:
            return state;
    }
}