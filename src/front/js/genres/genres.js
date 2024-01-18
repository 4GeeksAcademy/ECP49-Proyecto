import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Genres = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="jumbotron">
            
			<h1 className="display-4">This will show the demo element: {store.genres[params.theid].type}</h1>
			
			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>

		</div>
	);
};

Genres.propTypes = {
	match: PropTypes.object,
	id: PropTypes.number,
  	type: PropTypes.string
};
