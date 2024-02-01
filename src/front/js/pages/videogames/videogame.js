import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const Videogame = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [selectedGame, setSelectedGame] = useState(null);
  const { theid } = useParams();

  useEffect(() => {
    const fetchRawgData = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${theid}?key=e8722d91c21d4eec9047a9a02fd9efe7`);
        const data = await response.json();

        if (data) {
          setSelectedGame(data);
        }
      } catch (error) {
        console.error("Error fetching data from RAWG API:", error);
      }
    };

    fetchRawgData();
  }, [theid]);

  return (

    <div className="pb-5 text-center container card fondo search_list">
      {store.videogames[params.theid] ? (
        <>
          <h1 className="display-5 fw-bold text-body-emphasis">{store.videogames[params.theid].name}</h1>
          <div className="row justify-content-around align-items-center">
            {/* <div className="col-2">
              <img className="img-thumbnail mx-2" style={{ maxWidth: "350px", bottom: "0px" }} src={selectedGame.background_image} alt="Card image cap" />
            </div> */}
            <div className="col-8">
              <p className="card-text card-body mx-4">Description: {store.videogames[params.theid].description}</p>
              <p className="lead m-4 card-hearder">PEGI: {store.videogames[params.theid].pegi}</p>
              <p className="lead m-4 card-hearder">Year: {store.videogames[params.theid].year}</p>
            </div>
            <hr className="my-4" />

          </div>

        </>

      ) : (
        <p>Videogame not found</p>
      )
      }

      <div className="col-lg-6 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
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
      </div>
    </div >
  );
};

Videogame.propTypes = {
  name: PropTypes.string,
  pegi: PropTypes.number,
  year: PropTypes.number,
};

