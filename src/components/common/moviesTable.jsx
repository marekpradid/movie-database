import React from "react";

export function MoviesTable(props) {
    const {paginatedMovies, onMovieClick} = props;

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Year</th>
                <th scope="col">Type</th>
            </tr>
            </thead>
            <tbody>
            {paginatedMovies.map(movie => (
                <tr key={movie.imdbID} onClick={() => onMovieClick(movie.imdbID)}>
                    <td>{movie.Title}</td>
                    <td>{movie.Year}</td>
                    <td>{movie.Type}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}