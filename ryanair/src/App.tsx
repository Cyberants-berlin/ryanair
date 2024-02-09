// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Table from "./components/Table";
import DestinationCitiesCard from "./components/Cards";
import NavigationMenuDemo from "./components/Navbar";


function App() {
  return (
    <>
      <nav className=" py-7">
        <h1 className="text-9xl text-center subpixel-antialiased font-bold leading-10 my-4 px-4">Ryanair API</h1>
      </nav>
      <NavigationMenuDemo/>

      <div className="{inter.className}">
        <DestinationCitiesCard />
      </div>

    </>
  );
}

export default App;
