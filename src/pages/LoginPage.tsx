import React from "react";
import { Link } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Flex, Stack, Title, Button, Group } from '@mantine/core';

export const LoginPage = () => {
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
        <Title align="center" color={'#000000a8'} order={1}>Login</Title>
        <Login />
        <Group spacing={10}>
          Or
          <Button style={{ padding: 0 }} variant="light">
            <Link to={"/register"}>register</Link>
          </Button>
        </Group>
      </Stack>
    </Flex>
  );
};
