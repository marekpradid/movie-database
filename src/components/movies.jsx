import React, {useEffect, useRef, useState} from "react";
import './movies.scss';
import {Pagination} from "./common/pagination";
import {PaginationStep} from "../utils/paginationSteps";
import {MoviesTable} from "./common/moviesTable";
import {SearchInput} from "./common/searchInput";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../store/actions/movieActions";

export function Movies() {
    const dispatch = useDispatch();
    const inputElementRef = useRef(null);

    const pageSize = 10;
    const PAGINATION_STEP = PaginationStep;

    const fetchMoviesData = (title, currentPage) => dispatch(actions.fetchMovies(title, currentPage));
    const dispatchSearchedTitle = (title) => dispatch(actions.dispatchTitle(title));
    const dispatchCurrentPage = (page) => dispatch(actions.dispatchCurrentPage(page));

    const searchTitle = useSelector(state => state.movies.searchTitle);
    const isSearchPressed = useSelector(state => state.movies.isSearchPressed);
    const movies = useSelector(state => state.movies.moviesData);
    const totalResults = useSelector(state => state.movies.totalResults);
    const currentPage = useSelector(state => state.movies.currentPage);
    const errorSearch = useSelector(state => state.movies.errorSearch);

    const onSearchClick = async (title) => {
        if (!title) {
            return;
        }
        dispatchSearchedTitle(inputElementRef.current.value);

        fetchMoviesData(title, currentPage);
    }

    const handlePageChange = async page => {
        if (PAGINATION_STEP.PREVIOUS_STEP === page) {
            dispatchCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
            return;
        }
        if (PAGINATION_STEP.NEXT_STEP === page) {
            dispatchCurrentPage((currentPage === Math.ceil(totalResults / pageSize)) ? Math.ceil(totalResults / pageSize) : currentPage + 1);
            return;
        }

        dispatchCurrentPage(page);
    }

    useEffect(() => {
        if (!searchTitle) {
            return;
        }

        fetchMoviesData(searchTitle, currentPage);

    }, [currentPage, searchTitle])

    const navigation = useNavigate();

    const onMovieClick = id => {
        navigation("/movie/" + id);
    }

    const onFavouriteMoviesClick = () => {
        navigation("/favourite");
    }

    return (
        <div className="search-container">
            <SearchInput inputElementRef={inputElementRef} onSearchClick={onSearchClick}
                         onFavouriteMoviesClick={onFavouriteMoviesClick}></SearchInput>
            <h3 style={{marginTop: '2rem', paddingLeft: '0.5rem', color: 'red'}}>{errorSearch}</h3>

            {!errorSearch && isSearchPressed && movies.length > 0 &&
                <div>
                    <h3 style={{marginTop: '2rem'}}> Found {totalResults} by searched title <b>{searchTitle}</b></h3>
                    <MoviesTable paginatedMovies={movies} onMovieClick={onMovieClick}></MoviesTable>
                    <Pagination
                        items={totalResults}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}></Pagination>
                </div>
            }
        </div>
    )
}
