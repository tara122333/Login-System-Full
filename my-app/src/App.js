import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/home.page";
import LoginPage from "./page/login.page";
import RegistrationPage from "./page/registration.page";
function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" exect element={<HomePage />} />
        <Route path="/login" exect element={<LoginPage />} />
        <Route path="/registration" exect element={<RegistrationPage />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
