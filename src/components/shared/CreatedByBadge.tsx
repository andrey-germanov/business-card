import { Flex } from "@mantine/core";
import React from "react";

type IProps = {
  textColor: string;
};

export const CreatedByBadge = ({ textColor }: IProps) => {
  return (
    <Flex
      style={{
        width: "170px",
        height: "25px",
        borderRadius: "15px",
        fontSize: 13,
        marginTop: "25px",
        zIndex: 3,
        filter: 'invert(1)',
      }}
      justify={"center"}
      align={"center"}
    >
      <a
        style={{ color: textColor }}
        href="https://business-card-lime.vercel.app/"
        target={"_blank"}
        rel="noreferrer"
      >
        Created by @smart link
      </a>
    </Flex>
  );
};
