import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Genres = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();


	return (
		<div className="jumbotron">
			{store.genres[params.theid] ? (
				<>
					<h1 className="display-4">Type: {store.genres[params.theid].type}</h1>
					<hr className="my-4" />
				</>
			) : (
				<p>Genrenot found</p>
			)}
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
			<Link to="/genresList">
				<span className="btn btn-primary" href="#" role="button">
					BackList
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
