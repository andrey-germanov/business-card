import { Flex, Stack, Text, Title } from "@mantine/core";
import { ICardResponse, Link } from "../../../../types/types";
import { MyLink } from "../../../shared/MyLink";
import { CreatedByBadge } from "../../../shared/CreatedByBadge";
import { useStyles } from "./useStyles";

interface IProps {
  card: ICardResponse;
}

export const PreviewCard = ({ card }: IProps) => {
  const { backgroundImage, backgroundColor, textColor } = card.style;
  const { classes } = useStyles({
    backgroundImage,
    backgroundColor,
    textColor,
  });

  if (!card) return <>loading</>;
  return (
    <Stack className={classes.wrapperPreviewCard}>
      <Stack
        className={classes.previewCard}
        align={"center"}
        spacing={0}
      >
        <div className={classes.bands} />
        <Stack
          spacing={24}
          align={"center"}
          justify={"center"}
          className={classes.contentPreviewCard}
        >
          {card.avatar && (
            <img
              className={classes.avatar}
              src={card.avatar}
              alt="user avatar"
            />
          )}
          {card.data.name && (
            <Title size={card.data.fontSizeName}>{card.data.name}</Title>
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
