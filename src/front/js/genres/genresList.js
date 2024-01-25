import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Genres_list = () => {

  const { store, actions } = useContext(Context);
  const handleDeleteGenre = async (genre_id) => {
    try {
      console.log("Deleting genre with id:", genre_id);
      await actions.deleteGenre(genre_id);
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  return (
    <div className="container">
      <ul className="list-group">
        {store.genres == false && <p>...loading</p>}
        {store.genres.length > 0 &&
          store.genres.map((genre, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <Link to={"/consoles/" + index} className="text-decoration-none">
                  <span>{genre.type}</span>
                 </Link>

                <Link
                  className="btn btn-success"
                  to={"/genres/" + index}
                >
                  Learn More...
                </Link>

                <button className="btn btn-success" onClick={()=>actions.addFavoriteGenre(genre.type)}>Like!</button>

                
      
     

               

                
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteGenre(genre.id)}>
                  Delete
                </button>
                


              </li>
            );
          })}
      </ul>
      <br />

      
      <Link to="/">
        <button className="btn btn-primary">Back Home</button>
      </Link>
      <Link to="/formGenres/">
        <button className="btn btn-success">Add Genre</button>
      </Link>
 <Link to="/viewFavGenres/">
        <button className="btn btn-warning">Favorites</button>
      </Link>
    </div>
  );
};

Genres_list.propTypes = {
  type: PropTypes.string,
 
};







// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../store/appContext";

// export const Genres_list = () => {

//   const { store, actions } = useContext(Context);
//   const handleDeleteGenre = async (genre_id) => {
//     try {
//       console.log("Deleting genre with id:", genre_id);
//       await actions.deleteGenre(genre_id);
//     } catch (error) {
//       console.error("Error deleting genre:", error);
//     }
//   };
//   return (
//     <>
    
//     <div>
//       <h2>Genres</h2>
 
//         <div className="contenedorGenres">

//           {store.genres.map((item, index) => (
//             <div className="cardGenre card-container" >
//                 <img src="" alt="..." />
//                 <div className="card-body">
//                   <h5 className="card-title">{item.type}</h5>
//                   <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              
//                   <Link to={"/genres/" + index}>
//                     <button className="btn btn-primary">More</button>
//                   </Link>

//                   <button className="btn btn-success" onClick={()=>actions.addFavoriteGenre(item.type)}>Like!</button>

//                 </div>
//             </div>))}
//         </div>
        
//     </div>
//     <br/>
//     <div>
//       <Link to="/">
//         <button className="btn btn-primary">Back Home</button>
//       </Link>
//       <Link to="/formGenres/">
//         <button className="btn btn-success">Add Genre</button>
//       </Link>
//       <Link to="/viewFavGenres/">
//         <button className="btn btn-warning">Favorites</button>
//       </Link>
//     </div>
//     </>

//   );
// };
