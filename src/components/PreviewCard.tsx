import { Button, Flex, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IResponseCards } from "../types/types";

export type Card = {
  nickname: string;
  name: string;
  description: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
};

interface IPreviewCardProps {
  card: Card | undefined;
  backgroundColor: string;
  buttonColor: string;
  textColor: string;
}
export const PreviewCard = ({
  card,
  backgroundColor,
  buttonColor,
  textColor,
}: IPreviewCardProps) => {
  const navigate = useNavigate();

  const { nickname } = useParams();
  const [currentCard, setCurrentCard] = useState<
    IPreviewCardProps | IResponseCards
  >();
  useEffect(() => {
    console.log(nickname)
  }, []);

  return (
    <Stack
      style={{
        height: 550,
        width: 300,
        background: "black",
        borderRadius: "20px",
        padding: "15px",
      }}
    >
      <Stack
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "20px",
          padding: "0 20px",
          background: `${backgroundColor}`,
          margin: 0,
        }}
        align={"center"}
        justify={"space-between"}
        spacing={0}
      >
        <div
          style={{
            width: "150px",
            height: "25px",
            backgroundColor: "black",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        ></div>
        <Stack
          justify={"center"}
          align={"center"}
          spacing={5}
          style={{ color: textColor, textAlign: "center" }}
        >
          <div>@{card?.nickname}</div>
          <div>{card?.avatar}</div>
          <img
            style={{ width: "80px", borderRadius: "50%" }}
            src="https://media.licdn.com/dms/image/D4E35AQEobt_RK4dfZw/profile-framedphoto-shrink_100_100/0/1668525720508?e=1674900000&v=beta&t=GaIEzkO8o1B7ndJxQIpe-vYWgAWFwgyD6velbCj0DOs"
            alt=""
          />
          {card?.name && <h2>{card?.name}</h2>}
          {card?.description && <h4>{card?.description}</h4>}
        </Stack>
        <Stack spacing={24}>
          {card?.linkedin && (
            <Button
              style={{
                padding: "0 50px",
                backgroundColor: buttonColor,
                color: textColor,
              }}
              onClick={() => navigate(`${card?.linkedin}`)}
            >
              linkedin
            </Button>
          )}
          {card?.github && (
            <Button
              style={{
                padding: "0 50px",
                backgroundColor: buttonColor,
                color: textColor,
              }}
              onClick={() => navigate(`${card?.github}`)}
            >
              github
            </Button>
          )}
          {card?.youtube && (
            <Button
              style={{
                padding: "0 50px",
                backgroundColor: buttonColor,
                color: textColor,
              }}
              onClick={() => navigate(`${card?.youtube}`)}
            >
              youtube
            </Button>
          )}
        </Stack>

        <Flex
          style={{
            width: "150px",
            height: "25px",
            backgroundColor: "black",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            color: "rgb(181 182 243)",
          }}
          justify={"center"}
          align={"center"}
        >
          I want so page!
        </Flex>
      </Stack>
    </Stack>
  );
};
