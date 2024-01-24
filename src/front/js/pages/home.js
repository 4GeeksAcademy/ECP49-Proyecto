import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

import { VideogameListContainer } from "../pages/videogames/videogameListContainer";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<div className="text-center mt-5">
			

			<Link to="/consoles">
						<button className="btn btn-warning">Consolas</button>
					</Link>


			
		</div>

			<div className="text-center mt-5">
				<VideogameListContainer />
			</div>
		</>
	);
};
