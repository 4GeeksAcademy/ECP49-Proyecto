import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const ConsoleEdit = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [consoleData, setConsoleData] = useState({
    name: "",
    company: "",
    year: "",
    
  });

  useEffect(() => {
    actions.getSingleConsole(params.consoleId).then((console) => {
      setConsoleData({
        name: console.name,
        company: console.company,
        year: console.year,
       
      });
    });
  }, [params.consoleId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsoleData((prevConsoleData) => ({
      ...prevConsoleData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    actions.updateConsole(params.consoleId, consoleData);
  };

  return (
    <div>
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

      
        <button type="button" onClick={handleUpdate} className="btn btn-primary">
          Update Console
        </button>
      </form>
    </div>
  );
};
