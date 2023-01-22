import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BuilderCard } from "./components/builderCard/BuilderCard";
import { MainScreen } from "./components/MainScreen";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { PreviewCard } from "./components/builderCard/Card/Card";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<MainScreen />} />
            <Route path={`/login`} element={<LoginPage />} />
            <Route path={`/register`} element={<RegistrationPage />} />
            {/* TODO: edit - /builder-card:userId */}
            <Route path={`/builder-card`} element={<BuilderCard />} />
            <Route path={`/:nickname`} element={<PreviewCard />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
