import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Form } from "./Form";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const HandleLogin = (email: string, password: string) => {
    const auth = getAuth();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
          .then(() => navigate("/"))
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return <Form error={error} title={"sign in"} handleClick={HandleLogin} />;
};
