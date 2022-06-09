import React from "react";

export function SearchInput(props) {
    const {inputElementRef, onSearchClick, onFavouriteMoviesClick} = props;

    function keyPress(event) {
        if (event.key === "Enter") {
            onSearchClick(inputElementRef.current?.value);
        }
    }

    return (
        <div className="input-group mb-3 search-panel">
            <input type="text" ref={inputElementRef} className="form-control" placeholder="Your movie choice..."
                   aria-label="Your movie choice..." aria-describedby="button-addon2"
                   onKeyPress={(event) => keyPress(event)}></input>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                    onClick={() => onSearchClick(inputElementRef.current?.value)}>Search
            </button>
            <button type="button" className="btn btn-danger"
                    style={{position: 'absolute', right: '-50%', borderRadius: '10px 100px / 120px'}}
                    onClick={() => onFavouriteMoviesClick()}>To Favourites
            </button>
        </div>
    );
}