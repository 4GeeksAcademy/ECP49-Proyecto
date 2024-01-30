import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./searchBar.js"

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-danger mb-0 h1">Inicio</button>
				</Link>

				<Link to="/userProfile">
					<button className="btn btn-danger mb-0 h1">My Profile</button>
				</Link>

				<Link to="/adminform">
					{store.auth === true ? <button onClick={() => actions.logoutadmin()} className="btn btn-danger" >logoutADMIN</button> : <button className="btn btn-primary">ADMIN</button>}
				</Link>

			{/* ++ SEARCH BUTTON ++ */}
				<SearchBar />
				<div className="ml-auto">
					{store.user ?
						<>
							<Link to="/signup">
								<button className="btn btn-primary">Signup</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-primary">Login</button>
							</Link>
						</>
						:
						<>
							<Link to="/private">
								<button className="btn btn-primary">User</button>
							</Link>
							<button className="btn btn-primary" onClick={() => actions.logout()}>Log Out</button>
						</>
					}
				</div>
			</div>
		</nav>
	);
};

