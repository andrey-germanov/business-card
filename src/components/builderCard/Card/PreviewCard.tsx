import { Flex, Stack, Title } from "@mantine/core";
import { ICardResponse, Link } from "../../../types/types";
import { MyLink } from "../MyLink";

interface IProps {
  card: ICardResponse;
}

export const PreviewCard = ({ card }: IProps) => {
  if (!card) return <>loading</>;
  return (
    <Stack
      style={{
        height: 600,
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
          overflow: 'auto'
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

        <div
          style={{
            background: `${card.style.backgroundColor}`,
            width: "calc(100% - 30px)",
            height: "40%",
            position: "absolute",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        />
        <div
          style={{
            background: `#fff`,
            position: "absolute",
            bottom: "15px",
            width: "calc(100% - 30px)",
            height: "60%",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        />
        <Stack
          spacing={24}
          align={"center"}
          justify={"center"}
          style={{
            width: "100%",
            background: "white",
            padding: "18px",
            marginTop: "20px",
            borderRadius: "20px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            zIndex: 2,
          }}
        >
          <img
            style={{ width: "150px", borderRadius: "50%" }}
            src={card.avatar}
            alt=""
          />
          {card.data.name && <Title style={{ fontSize: 16 }} order={2}>{card.data.name}</Title>}
          {card.data.description && (
            <Title style={{ fontSize: 12 }} order={4}>{card.data.description}</Title>
          )}
          <Stack style={{ width: "100%" }}>
            {!!card.links &&
              card.links.map((item: Link) => {
                return (
                  <MyLink
                    key={item.id}
                    backgroundColor={card.style.backgroundColor}
                    descriptionLink={item.descriptionLink}
                    titleLink={item.titleLink}
                    link={item.link}
                    id={item.id}
                  />
                );
              })}
          </Stack>
        </Stack>
        <Flex
          style={{
            width: "170px",
            height: "25px",
            background: `${card.style.backgroundColor}`,
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            color: "#fff",
            position: "absolute",
            bottom: 15,
            fontSize: 13,
          }}
          justify={"center"}
          align={"center"}
        >
          I want the same page!
        </Flex>
      </Stack>
    </Stack>
  );
};
