import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BuilderCard } from "./pages/BuilderCard";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Card } from "./pages/Card";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/login`} element={<LoginPage />} />
            <Route path={`/register`} element={<RegistrationPage />} />
            <Route path={`/builder-card`} element={<BuilderCard />} />
            <Route path={`/:nickname`} element={<Card />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
