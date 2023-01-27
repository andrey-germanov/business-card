import { Button, Stack } from "@mantine/core";
import React from "react";
import { EditLinkModal } from "./EditLinkModal";

type IProps = {
  backgroundColor?: string;
  editableLink?: boolean;
  id: number;
  link: string;
  titleLink: string;
  descriptionLink: string;
};

export const MyLink = ({
  backgroundColor = "#228be6",
  editableLink,
  id,
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
        width: "100%",
      }}
      component="a"
      href={`${link}`}
      target={"_blank"}
      rel="noreferrer"
    >
      <div
        style={{
          fontSize: "12px",
        }}
      >
        {titleLink}
      </div>
      <div
        style={{
          fontSize: "10px",
          opacity: 0.7,
        }}
      >
        {descriptionLink}
      </div>
      {editableLink && <EditLinkModal id={id} />}
    </Button>
  );
};
