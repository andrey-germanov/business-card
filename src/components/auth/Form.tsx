import React, { useState } from "react";
import { Input, Button } from '@mantine/core';

interface IFormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
  error: string;
  disableSignUpButton?: boolean;
}
export const Form = ({ title, handleClick, error, disableSignUpButton }: IFormProps) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <Input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <Button disabled={disableSignUpButton} onClick={() => handleClick(email, pass)}>{title}</Button>
      <p>{error}</p>
    </>
  );
};
