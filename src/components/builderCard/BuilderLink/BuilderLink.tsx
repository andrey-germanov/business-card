import { Flex } from "@mantine/core";
import React from "react";
import { ICardResponse, Link } from "../../../types/types";
import { MyLink } from "../../shared/MyLink";
import { BuilderLinksModal } from "./BuilderLinksModal";

interface IProps {
    card: ICardResponse;
}
export const BuilderLink = ({card}: IProps) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap={24}
      direction={"column"}
      style={{
        borderRadius: "30px",
      }}
    >
      {!!card.links &&
        card.links.map((item: Link) => {
          return (
            <MyLink
              key={item.id}
              descriptionLink={item.descriptionLink}
              titleLink={item.titleLink}
              link={item.link}
              id={item.id}
              editableLink
            />
          );
        })}
      <BuilderLinksModal />
    </Flex>
  );
};
