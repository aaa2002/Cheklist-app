import "./App.css";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar/Calendar";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Day from "./Calendar/DayPage";

function App() {
  return (
    <div>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/day/:absoluteDate" element={<Day />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
