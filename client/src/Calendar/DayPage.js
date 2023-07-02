import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Day() {
  const [backendData, setBackendData] = useState([{}]);

  const { absoluteDate } = useParams();

  useEffect(() => {
    fetch(`/day/${absoluteDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error:", error);
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
          <label>Date: {absoluteDate}</label>
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
