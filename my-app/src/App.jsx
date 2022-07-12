import React from "react";
import { Route,Routes } from "express";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" exect element={<h1>this is home</h1>}/>
      </Routes>
    </>
  );
}

export default App;
