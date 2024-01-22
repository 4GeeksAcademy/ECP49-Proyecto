import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const {store, actions} = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<Link to="/adminform">
                        

						{store.auth === true ? null: <button className="btn btn-primary">Administrador</button> }


                    </Link>
					
				<div className="ml-auto">
					{!store.user ? 
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

