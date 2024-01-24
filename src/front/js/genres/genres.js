import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Genres = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const handleDeleteGenre = (genre_id) => {
		actions.deleteGenre(genre_id);
	  };

	return (
		<div className="jumbotron">
            {store.genres[params.theid] ? (
                <>
                    <h1 className="display-4">Type: {store.genres[params.theid].type}</h1> 
                    <hr className="my-4" />
					<button className="btn btn-success" onClick={()=>actions.addFavoriteGenre(store.genres[params.theid].type)}>Like!</button>

                </>
            ) : (
                <p>Console not found</p>
            )}
			<Link to="/genresList">
				<span className="btn btn-primary" href="#" role="button">
					Back Genres List
				</span>
			</Link>
			<Link to="/formEditGenres">
				<span className="btn btn-secondary" href="#" role="button">
					Edit Genre
				</span>
			</Link>
			<button className="btn btn-danger" onClick={() => handleDeleteGenre(item.id)}>Delete Genre</button>

		</div>
	);
};

Genres.propTypes = {
	match: PropTypes.object,
	id: PropTypes.number,
  	type: PropTypes.string
};
