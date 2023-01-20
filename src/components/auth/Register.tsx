import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Form } from "./Form";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [error, setError] = useState("");

  const HandleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => {
        setError(error.message);
      });
  };
  return <Form error={error} title={"sign up"} handleClick={HandleRegister} />;
};
