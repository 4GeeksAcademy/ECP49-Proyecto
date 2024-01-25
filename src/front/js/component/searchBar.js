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
            if (videogamesArray[i] === textInput) {
                navigate(`/videogames/${i}`);
                return;
            }
        }

        for (let i = 0; i < consolesArray.length; i++) {
            if (consolesArray[i] === textInput) {
                navigate(`/consoles/${i}`);
                return;
            }
        }

        for (let i = 0; i < genresArray.length; i++) {
            if (genresArray[i] === textInput) {
                navigate(`/genres/${i}`);
                return;
            }
        }

        // If no match is found, you can handle it as needed (e.g., show an error message)
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
            <div className="">
                <div className="input-group mb-3">
                    <div className="input-group-append">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                        <datalist>
                            {filteredArray.length > 0 &&
                                filteredArray.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                        </datalist>
                        <div className="dropdown">
                            {/* Render search results */}
                            {searchResults.length > 0 && (
                                <ul>
                                    {searchResults.map((game) => (
                                        <li key={game.id}>
                                            <Link to={`/games/${game.id}`}>{game.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={(e) => handleSearch(e)}
                        >
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
};