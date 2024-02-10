// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DestinationCitiesCard from "./components/Cards";
import Navbar from "./components/Navbar";
import DetailComponent from "./components/Detail";
import Registration from "./components/Registration";
import {Login} from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DestinationCitiesCard />} />
          <Route path="/detail/:city" element={<DetailComponent />} /> 
          <Route path="/register" element={<Registration/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
