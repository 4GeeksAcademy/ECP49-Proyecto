//  import React, { useContext, useEffect, useState } from "react";
//  import PropTypes from "prop-types";
//  import { Context } from "../store/appContext";

//  export const Videogame = ({ id }) => {
//    const { store, actions } = useContext(Context);
//    const [videogame, setVideogame] = useState(null);

//     const fetchVideogame = async () => {
//      //  const response = await fetch(`https://stunning-xylophone-g7rqpr794wxhv479-3001.app.github.dev/api/videogames/2`);
//       const response = await fetch(`https://stunning-xylophone-g7rqpr794wxhv479-3001.app.github.dev/api/videogames/${id}`);
//       const videogameData = await response.json();
//       setVideogame(videogameData);
//     };
//    useEffect(() => {
//      fetchVideogame();
//    }, [id]);

//      if (!videogame) {
//        return <p>Loading...</p>;
//      }
//    //  const handleUpdate = () => {
//    //    actions.getSingleVideogame(videogameData.id);
//    //  }
//    //  const handleDelete = () => {
//    //    alert("Delete button clicked");
//    //  };
//    //  useEffect(() => {
//    //    // actions.getVideogames();
//    //    actions.getSingleVideogame();
//    //  }, []);
//      return (
//        <>
//          <div key={videogame.id}>
//            <h2>{videogame.name}</h2>
//            <p>Pegi: {videogame.pegi}</p>
//            <p>Year: {videogame.year}</p>
//          </div>
//          {/* <button onClick={() => handleUpdate(videogame)}>Update</button>  */}
//          {/* <button onClick={() => handleCancel()}>Cancel</button> */}
//        </>
//      );
//    };
//   Videogame.propTypes = {
//      // id: PropTypes.number.isRequired,
//      name: PropTypes.string,
//      pegi: PropTypes.number,
//      year: PropTypes.number,
//    };

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Videogame = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="jumbotron">
			<h1 className="display-4">Name: {store.videogames[params.theid].name}</h1>
      <h1 className="display-4">Pegi: {store.videogames[params.theid].pegi}</h1>
			<h1 className="display-4">Year: {store.videogames[params.theid].year}</h1>

      <hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
      <Link to="/videogames">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back to the list
				</span>
			</Link>
		</div>
	);
}

Videogame.propTypes = {
	match: PropTypes.object
};

