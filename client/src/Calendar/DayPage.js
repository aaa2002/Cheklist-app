import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Day() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/day")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div className="day-page">
      <h1>Day Page</h1>
      {typeof backendData.tasks === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.tasks.map((task, i) => <p key={i}>{task}</p>)
      )}

      <div>
        <form className="taskInput">
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Description:
            <textarea type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}
