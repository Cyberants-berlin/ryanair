// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Table from "./components/Table";
import ImageGridExample from "./components/Cards";

function App() {
  return (
    <>
      <h1>Ryanair API</h1>
      <div className="App">
        <ImageGridExample />
      </div>
      <Table />
    </>
  );
}

export default App;
