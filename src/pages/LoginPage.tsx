import React from "react";
import { Link } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Title, Group } from "@mantine/core";
import { SignLayout } from "../components/auth/shared/SignLayout";

export const LoginPage = () => {
  return (
    <SignLayout>
      <Title align="center" color={"#000000a8"} order={1}>
        Login
      </Title>
      <Login />
      <Group spacing={10}>
        Or
        <Link to={"/register"}>register</Link>
      </Group>
    </SignLayout>
  );
};
