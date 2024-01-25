import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

import { VideogameListContainer } from "../pages/videogames/videogameListContainer";
import { ConsoleListContainer } from "./consoles/consoleListContainer";
import { GenreListContainer } from "../genres/genreListContainer";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<div className="text-center mt-5">
			



			
		</div>

			<div className="text-center mt-5">
				<VideogameListContainer />
				<ConsoleListContainer />
				<GenreListContainer />
				
			</div>
		</>
	);
};
