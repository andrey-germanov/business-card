import React from "react";
import { Link } from "react-router-dom";
import { Register } from "../components/modules/auth/Register";
import { Title, Group } from "@mantine/core";
import { SignLayout } from "../components/modules/auth/shared/SignLayout";

export const RegistrationPage = () => {
  return (
    <SignLayout>
      <Title align="center" color={"#000000a8"} order={1}>
        Registration
      </Title>
      <Register />
      <Group spacing={10}>
        Already have an account
        <Link to={"/login"}>sign in</Link>
      </Group>
    </SignLayout>
  );
};
