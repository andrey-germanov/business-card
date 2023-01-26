import React from "react";
import { Link } from "react-router-dom";
import { Register } from "../components/auth/Register";
import { Flex, Stack, Text, Title, Group, Button } from "@mantine/core";

export const RegistrationPage = () => {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"}>
      <Stack
        style={{
          maxWidth: "525px",
          width: "100%",
          backgroundColor: "#fff",
          margin: "32px",
          padding: "32px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        spacing={32}
      >
        <Title align="center" color={"#000000a8"} order={1}>
          Registration
        </Title>
        <Register />
        <Group spacing={10}>
          Already have an account
          <Link to={"/login"}>sign in</Link>
        </Group>
      </Stack>
    </Flex>
  );
};
