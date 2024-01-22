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
			{store.genres.map((item, index) => (
    		<div className="card" style={{width: "18rem;"}}>
            	<img src="..." className="card-img-top" alt="..."/>
            		<div className="card-body">
                		<h5 className="card-title">{store.genres[params.theid].type}</h5>
                		<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                
                		<button className="btn btn-success" onClick={()=>actions.addFavoriteGenre(item.type)}>Like!</button>
                
            		</div>
        	</div>))}
			
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
