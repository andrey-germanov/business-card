import { Flex, Stack } from "@mantine/core";
import React from "react";
import { ICardResponse, Link } from "../../../../../types/types";
import { MyLink } from "../../../../shared/MyLink";
import { BuilderLinksModal } from "./BuilderLinksModal";

interface IProps {
  card: ICardResponse;
}
export const TabLink = ({ card }: IProps) => {
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
      <Stack spacing={36} style={{ width: '100%' }}>
        <Stack spacing={12} style={{ width: '100%' }}>
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
        </Stack>
        <BuilderLinksModal /> 
      </Stack>
    </Flex>
  );
};
