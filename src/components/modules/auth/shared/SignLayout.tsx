import React, { ReactNode } from "react";
import { Flex, Stack } from "@mantine/core";

interface IProps {
    children: ReactNode;
}

export const SignLayout = ({ children }: IProps) => {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"}>
      <Stack
        style={{
          maxWidth: "525px",
          width: "90%",
          backgroundColor: "#fff",
          margin: "16px",
          padding: "32px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        spacing={32}
      >
        {children}
      </Stack>
    </Flex>
  );
};
