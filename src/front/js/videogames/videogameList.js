// import React from "react";
// import PropTypes from "prop-types";
// import { useContext, useEffect, useState } from "react";
// import { Context } from "../store/appContext";
// import { Videogame } from "../videogames/videogame";

// export const VideogamesList = () => {
//   const { store, actions } = useContext(Context);
//   const [videogame, setVideogame] = useState(null);

//    const handleButtonClick = (videogameId) => {
//      actions.getSingleVideogame(videogameId);
//    };

//   useEffect(() => {
//     actions.getVideogames();
//   }, []);

//   return (
//     <div>
//       <h1>Videogames List</h1>
//       <div key={videogame.id}>
//            <h2>{videogame.name}</h2>
//            <p>Pegi: {videogame.pegi}</p>
//            <p>Year: {videogame.year}</p>
//          </div>
         
//       {store.videogames == false && (
//         <p>Error to Upload videogames, try again my friend!</p>
//       )}
//       {store.videogames.map((videogames, index) => (
//           <Videogame
//           videogame={videogames}
//           key={index}
//           id={index}          
//           />
//         //   <button
//         //     onClick={() => handleButtonClick(videogames.id)}
//         //     key={videogames.id}
//         //   >
//         // {/* <Link to="/videogames/:id/"> */}
        
//         // {/* </Link> */}
//         //   </button>
//       ))}
//     </div>
//   );
// };

// VideogamesList.propTypes = {
//   name: PropTypes.string,
//   pegi: PropTypes.number,
//   year: PropTypes.number,
// };
//       {/* {store.videogames.length > 0 && */}
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Context } from "../store/appContext";

export const VideogamesList = () => {
	const { store, actions } = useContext(Context);
  // const {videogames, setVideogames} = useState()
  
   useEffect(() => {
    console.log(actions.getVideogames())
    console.log(store.videogames)
   }, []);

	return (
		<div className="container">
			<ul className="list-group">
				{store.videogames.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							>
							<Link to={"/videogames/" + index}>
								<span>Link to: {item.name}</span>
                <span>Link to: {item.pegi}</span>
								<span>Link to: {item.year}</span>

							</Link>
							
							<button className="btn btn-success" onClick={() => actions.getVideogames(index)}>
								Change Color
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
VideogamesList.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};