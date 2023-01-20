import React from "react";
import { Link } from "react-router-dom";
import { Register } from "../components/auth/Register";

export const RegistrationPage = () => {
  return (
    <div>
      <h1>RegistrationPage</h1>
      <Register />
      <p>
        Already have an account <Link to={"/login"}>sign in</Link>
      </p>
    </div>
  );
};
