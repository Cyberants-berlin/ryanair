// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DestinationCitiesCard from "./components/Cards";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DestinationCitiesCard />} />
          
        </Routes>
      </Router>
      <div className="{inter.className}">
        <DestinationCitiesCard />
      </div>
    </>
  );
}

export default App;
