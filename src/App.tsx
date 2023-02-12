import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { BuilderCardPage } from "./pages/BuilderCardPage";
import { CardPage } from "./pages/CardPage";
import { LogoutPage } from "./pages/LogoutPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/login`} element={<LoginPage />} />
            <Route path={`/logout`} element={<LogoutPage />} />
            <Route path={`/register`} element={<RegistrationPage />} />
            <Route path={`/builder-card`} element={<BuilderCardPage />} />
            <Route path={`/:nickname`} element={<CardPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
