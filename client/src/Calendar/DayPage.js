import React from "react";
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import moment from "moment";

export default function Day() {
    const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div className="day-page">
      <h1>Day Page</h1>
      {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}
