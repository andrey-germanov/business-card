import { Flex, Stack, Text, Title } from "@mantine/core";
import { ICardResponse, Link } from "../../../types/types";
import { MyLink } from "../../shared/MyLink";
import { CreatedByBadge } from "../../shared/CreatedByBadge";

interface IProps {
  card: ICardResponse;
}

export const PreviewCard = ({ card }: IProps) => {
  if (!card) return <>loading</>;
  return (
    <Stack
      style={{
        height: 700,
        minWidth: 375,
        width: 425,
        background: "black",
        borderRadius: "30px",
        padding: "15px",
        position: "relative",
      }}
    >
      <Stack
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "20px",
          padding: "0 20px",
          margin: 0,
          overflow: "auto",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url('${card.style.backgroundImage}')`,
          backgroundColor: card.style.backgroundColor,
        }}
        align={"center"}
        spacing={0}
      >
        <div
          style={{
            width: "150px",
            height: "25px",
            backgroundColor: "black",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
            zIndex: 1,
          }}
        ></div>
        <Stack
          spacing={24}
          align={"center"}
          justify={"center"}
          style={{
            width: "100%",
            background: card.style.backgroundColor ? "white" : "",
            padding: "18px",
            marginTop: "20px",
            borderRadius: "20px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            zIndex: 2,
            color: card.style.textColor,
          }}
        >
          {card.avatar && (
            <img
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              src={card.avatar}
              alt=""
            />
          )}
          {card.data.name && (
            <Title size={card.data.fontSizeName}>
              {card.data.name}
            </Title>
          )}
          {card.data.description && (
            <Title size={card.data.fontSizeDescription} order={4}>
              {card.data.description}
            </Title>
          )}
          <Stack style={{ width: "100%" }}>
            {!!card.links &&
              card.links.map((item: Link) => {
                return (
                  <MyLink
                    key={item.id}
                    backgroundColor={card.style.buttonColor}
                    textColor={card.style.textColor}
                    descriptionLink={item.descriptionLink}
                    titleLink={item.titleLink}
                    link={item.link}
                    id={item.id}
                  />
                );
              })}
          </Stack>
        </Stack>
        <CreatedByBadge textColor={card.style.textColor} />
      </Stack>
    </Stack>
  );
};
