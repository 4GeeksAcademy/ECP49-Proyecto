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
					<button className="btn btn-danger mb-0 h1"><i class="fa-solid fa-house-user"></i></button>
				</Link>

				<Link to="/userProfile">
					<button className="btn btn-danger mb-0 h1">My Profile</button>
				</Link>

				<Link to="/adminform">
					{store.auth === true ? <button onClick={() => actions.logoutadmin()} className="btn btn-danger" ><i class="fa-solid fa-right-from-bracket mx-2"></i>logoutADMIN</button> : <button className="btn btn-primary">ADMIN</button>}
				</Link>

			{/* ++ SEARCH BUTTON ++ */}
				<SearchBar />
				<div className="ml-auto">
					{store.user ?
						<>
							<Link to="/signup" className="mx-2">
								<button className="btn btn-primary"><i className="fa-solid fa-user-plus mx-2"></i>Signup</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-primary"><i className="fas fa-sign-in mx-2"></i>Login</button>
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

