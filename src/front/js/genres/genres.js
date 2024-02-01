import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Genres = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [selectedGenre, setselectedGenre] = useState(null);
  const { theid } = useParams();

  useEffect(() => {
    const fetchRawgData = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/genres/${theid}?key=e8722d91c21d4eec9047a9a02fd9efe7`);
        const data = await response.json();

        if (data) {
          setselectedGenre(data);
          setTheid(theid - 1);
        }
      } catch (error) {
        console.error("Error fetching data from RAWG API:", error);
      }
    };

    fetchRawgData();
  }, [theid]);

  return (
    <div className="px-4 py-5 mx-5 text-center card fondo">

      {store.genres[params.theid] ? (
        <>
          <h1 className="display-5 fw-bold text-body-emphasis">{store.genres[params.theid].type}</h1>
          {/* <h2>{selectedGenre.name}</h2> */}

          <hr className="my-4" />

          <div className="row justify-content-around align-items-center">
            {/* <div className="col-2">
              <img className="img-thumbnail" style={{ maxWidth: "350px" }} src={selectedGenre.image_background} alt="Card image cap" />
            </div> */}
            <div className="col-8">
              {/* <p className="card-text"><strong>Description:</strong> {selectedGenre.description || "Not defined"}</p> */}
              {/* <p className="card-text"><strong>Games Count:</strong> {selectedGenre.games_count || "Unknown"}</p> */}
            </div>
          </div>
        </>
      ) : (
        <p>Genre not found</p>
      )}

      <div className="col-lg-6 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/">
            <span className="btn btn-primary btn-lg" href="#" role="button">
              Back home
            </span>
          </Link>
          <Link to="/genresList">
            <span className="btn btn-primary btn-lg" href="#" role="button">
              BackList
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

Genres.propTypes = {
  match: PropTypes.object,
  id: PropTypes.number,
  type: PropTypes.string
};
