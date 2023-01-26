import { Button, Stack } from "@mantine/core";
import React from "react";

type IProps = {
  backgroundColor?: string;
  link: string;
  titleLink: string;
  descriptionLink: string;
};

export const MyLink = ({
  backgroundColor = "#228be6",
  link,
  titleLink,
  descriptionLink,
}: IProps) => {
  return (
    <Button
      style={{
        padding: "10px",
        backgroundColor: `${backgroundColor}`,
        color: "#fff",
        height: "auto",
        borderRadius: "20px",
        textAlign: "center",
        whiteSpace: "normal",
        width: '100%'
      }}
      component="a"
      href={`${link}`}
      target={"_blank"}
      rel="noreferrer"
    >
      <div>{titleLink}</div>
      <div
        style={{
          fontSize: "12px",
          opacity: 0.7,
        }}
      >
        {descriptionLink}
      </div>
    </Button>
  );
};
