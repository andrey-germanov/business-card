import { Button, Flex } from "@mantine/core";
import React from "react";
import { EditLinkModal } from "../modules/builderCard/Tabs/TabLink/EditLinkModal";
import { DeleteLinkModal } from "../modules/builderCard/Tabs/TabLink/DeleteLinkModal";

type IProps = {
  backgroundColor?: string;
  textColor?: string;
  editableLink?: boolean;
  id: number;
  link: string;
  titleLink: string;
  descriptionLink: string;
};

export const MyLink = ({
  backgroundColor = "#228be6",
  textColor,
  editableLink,
  id,
  link,
  titleLink,
  descriptionLink,
}: IProps) => {
  return (
    <Flex
      style={{
        width: "100%",
      }}
      direction={"row"}
    >
      <Button
        style={{
          padding: "10px",
          backgroundColor: backgroundColor,
          color: textColor,
          height: "auto",
          borderRadius: !editableLink ? "20px" : '',
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
            fontSize: "14px",
          }}
        >
          {titleLink}
        </div>
        <div
          style={{
            fontSize: "12px",
            lineHeight: '16px',
            opacity: 0.7,
          }}
        >
          {descriptionLink}
        </div>
      </Button>
      {editableLink && (
        <div
          style={{
            minWidth: "70px",
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
          }}
        >
          <EditLinkModal id={id} />
          <DeleteLinkModal id={id} />
        </div>
      )}
    </Flex>
  );
};
