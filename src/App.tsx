import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WrapperApp } from "./components/WrapperApp";
import { BuilderCard } from "./components/BuilderCard";
import { MainScreen } from "./components/MainScreen";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <WrapperApp>
          <Routes>
            <Route path={`/`} element={<MainScreen />} />
            <Route path={`/login`} element={<LoginPage />} />
            <Route path={`/register`} element={<RegistrationPage />} />
            {/* TODO: edit - /builder-card:userId */}
            <Route path={`/builder-card`} element={<BuilderCard />} />
          </Routes>
        </WrapperApp>
      </BrowserRouter>
    </div>
  );
};

export default App;
