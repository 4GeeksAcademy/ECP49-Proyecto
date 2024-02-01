import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SearchBar = () => {
    const { store, actions } = useContext(Context);
    const [textInput, setTextInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const videogamesArray = store.videogames.map((videogame) => videogame.name);
    const consolesArray = store.consoles.map((console) => console.name);
    const genresArray = store.genres.map((genre) => genre.name);

    const combinesArray = [...videogamesArray, ...consolesArray, ...genresArray];

    const handleSearch = (e) => {
        e.preventDefault();

        for (let i = 0; i < videogamesArray.length; i++) {
            if (videogamesArray[i] === textInput)
                navigate("/videogames/" + i);
            else if (consolesArray[i] === textInput)
                navigate("/consoles/" + i);
            else if (genresArray[i] === textInput)
                navigate("/genres/" + i);
        }
        console.log("No match found");
    };

    const filteredArray = combinesArray.filter(
        (item) =>
            item && item.toLowerCase().includes(textInput.toLowerCase()) && item !== textInput
    );

    useEffect(() => {
        const fetchRawgData = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/games?key=e8722d91c21d4eec9047a9a02fd9efe7&search=${textInput}`);
                const data = await response.json();

                // Assuming the data structure from the API has a results property containing an array of games
                setSearchResults(data.results || []);
            } catch (error) {
                console.error("Error fetching data from RAWG API:", error);
            }
        };

        if (textInput.trim() !== "") {
            fetchRawgData();
        } else {
            // Clear results if the search input is empty
            setSearchResults([]);
        }
    }, [textInput]);

    return (
        <>
            <div className="fondo_nav">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <datalist className="">
                        {filteredArray.length > 0 &&
                            filteredArray.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                    </datalist>
                    <div className="dropdown position-absolute mt-3 card bg-light">
                        {/* Render search results */}
                        {searchResults.length > 0 && (
                            <ul>
                                {searchResults.map((game) => (
                                    <li key={game.id} className="list-group my-4">
                                        <Link to={`/games/${game.id}`}>{game.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="input-group-append">
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-mdb-ripple-init
                            onClick={(e) => handleSearch(e)}
                        >
                            <i className="fa fa-search btn-primary"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};