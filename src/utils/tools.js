import _ from "lodash";

export const getFavouriteMovies = () => {
    let favouriteMovies = getMoviesFromLS();
    return favouriteMovies.length === 0 ? [] : JSON.parse(favouriteMovies);
};

export const setFavouriteMovies = (movie, like) => {
    let favouriteMovies = getMoviesFromLS();
    let parsedObject = "";
    if (favouriteMovies.length > 0) {
        parsedObject = JSON.parse(favouriteMovies);
    }

    if (like) {
        if (favouriteMovies.length === 0) {
            favouriteMovies.push(movie);
            parsedObject = JSON.stringify(favouriteMovies);
        } else {
            parsedObject = JSON.stringify(_.concat(parsedObject, [movie]));
        }
    } else {
        if (favouriteMovies.length === 0) {
            return;
        }

        parsedObject = JSON.stringify(_.remove(parsedObject, function (predicat) {
            return predicat.imdbID !== movie.imdbID;
        }));

        localStorage.removeItem("favouriteMovies");
    }

    return localStorage.setItem("favouriteMovies", parsedObject);
};

function getMoviesFromLS() {
    return localStorage.getItem("favouriteMovies") ? localStorage.getItem("favouriteMovies") : [];
}

export function isMovieLiked(id) {
    let favouriteMovies = getMoviesFromLS();
    let parsedObject = "";

    if (favouriteMovies.length === 0) {
        return false;
    }

    parsedObject = JSON.parse(favouriteMovies);

    let likedMovie = _.remove(parsedObject, function (predicat) {
        return predicat.imdbID === id;
    })

    if (likedMovie.length > 0) {
        return true;
    }
}