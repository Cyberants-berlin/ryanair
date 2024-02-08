// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Table from "./components/Table";
import DestinationCitiesCard from "./components/Cards";


function App() {
  return (
    <>
      <nav>
        <h1>Ryanair API</h1>
      </nav>

      <div className="{inter.className}">
        <DestinationCitiesCard />
      </div>

    </>
  );
}

export default App;
