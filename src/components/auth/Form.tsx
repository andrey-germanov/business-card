import React, { useState } from "react";

interface IFormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
  error: string;
}
export const Form = ({ title, handleClick, error }: IFormProps) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button onClick={() => handleClick(email, pass)}>{title}</button>
      <p>{error}</p>
    </>
  );
};
