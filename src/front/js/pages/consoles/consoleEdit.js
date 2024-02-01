import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const ConsoleEdit = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [consoleData, setConsoleData] = useState({
    name: "",
    company: "",
    year: "",
  });

  useEffect(() => {
    actions.getSingleConsole(params.theid).then((console) => {
      setConsoleData({
        name: console.name,
        company: console.company,
        year: console.year,
      });
    });
  }, [params.theid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsoleData((prevConsoleData) => ({
      ...prevConsoleData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    actions.updateConsole(params.theid, consoleData);
  };

  return (
    <div className="container card mt-5 list">
      <h2>Edit Console</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={consoleData.name}
          onChange={handleInputChange}
          className="form-control"
        />

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          value={consoleData.company}
          onChange={handleInputChange}
          className="form-control"
        />

        <label htmlFor="year">Year:</label>
        <input
          type="text"
          name="year"
          value={consoleData.year}
          onChange={handleInputChange}
          className="form-control"
        />

        <button
          type="button"
          onClick={handleUpdate}
          className="btn btn-md m-2 btn-green"
        >
          Update Console
        </button>

        <Link to="/consoles">
          <span className="btn btn-md m-2 btn btn-md m-2 btn-beige" href="#" role="button">
            Back Consoles
          </span>
        </Link>

      </form>
    </div>
  );
};

export default ConsoleEdit;
