import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SearchBar = () => {
    const { store, actions } = useContext(Context);
    const [textInput, setTextInput] = useState("");
    const navigate = useNavigate();

    const videogamesArray = store.videogames.map((videogame) => videogame.name)
    const consolesArray = store.consoles.map((console) => console.name)
    const genresArray = store.genres.map((genre) => genre.name)

    const combinesArray = [...videogamesArray, ...consolesArray, ...genresArray]

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
    };

    const filteredArray = combinesArray.filter(
        (item) =>
            // item.toLowerCase().includes(textInput.toLowerCase()) && item !== textInput
            item && item !== textInput
    )

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

