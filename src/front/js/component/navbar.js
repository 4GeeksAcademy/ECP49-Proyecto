import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./searchBar.js";
import '../../styles/home.css';
import Gamelab from "../../img/gamelab.png";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar">
			<div className="container fondo_nav page-footer">
				<div className="fondo_nav">
					<img src={Gamelab} alt="gamelab" className="logo mx-4 fondo_nav" />
					<Link to="/">
						<button className="btn btn-danger mb-0 h1"><i className="fa-solid fa-house-user btn-danger"></i></button>
					</Link>
				</div>
				{/* ++ SEARCH BUTTON ++ */}
				<SearchBar />
				<div className="ml-auto navbar">
					<div className="mx-2">
						<Link to="/adminform">
							{store.auth === true ? <button onClick={() => actions.logoutadmin()} className="btn btn-danger" ><i className="fa-solid fa-right-from-bracket mx-2 btn-primary"></i>logout Admin</button> : <button className="btn btn-primary"><i className="fa fa-key mx-2 btn-primary" aria-hidden="true"></i>
								Admin</button>}
						</Link>
					</div>
					<Link to="/userProfile">
						<button className="btn btn-danger mb-0 h1"><i className="fa fa-user btn-danger" aria-hidden="true"></i>
						</button>
					</Link>
					{store.user == false ?
						<>
							<Link to="/signup" className="mx-2">
								<button className="btn btn-primary"><i className="fa-solid fa-user-plus mx-2 btn-primary"></i>Signup</button>
							</Link>
							<div className="vr"></div>
							<Link to="/login">
								<button className="btn btn-primary"><i className="fas fa-sign-in mx-2 btn-primary"></i>Login</button>
							</Link>
						</>
						:
						<>
							
							<div className="vr"></div>
							<button className="btn btn-primary" onClick={() => actions.logout()}>Log Out</button>
						</>
					}
				</div>
			</div>
		</nav>
	);
};

