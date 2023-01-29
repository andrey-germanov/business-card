import { Button, Flex, Stack, Loader, Title, Text } from "@mantine/core";
import { useParams } from "react-router";
import { Context } from "../index";
import { useContext, useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { ICardResponse, Link } from "../types/types";
import { MyLink } from "../components/shared/MyLink";

export const Card = () => {
  const [card, setCard] = useState<ICardResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { nickname } = useParams();
  const { db } = useContext(Context);

  const [value, loadingCollection] = useCollection(collection(db, "cards"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  useEffect(() => {
    setNotFound(false);
    value?.docs.filter((doc) => {
      if (Array(doc.data()) && doc.data().nickname === nickname) {
        setCard(doc.data() as ICardResponse);
      }
      setNotFound(true);
      return null;
    });
  }, [nickname, loadingCollection]);

  if (notFound && !card) return <>page not found</>;
  if (!card) return <>loading </>;
  return (
    <Stack
      style={{
        height: "100%",
        width: "100%",
        margin: 0,
        padding: '0 10px',
        backgroundSize: 'cover',
        backgroundImage: `url('${card.style.backgroundImage}')`,
        backgroundColor: card.style.backgroundColor
      }}
      align={"center"}
      spacing={0}
    >
      {/* <div
        style={{
          background: `${card.style.backgroundColor}`,
          width: "100%",
          height: "40%",
          position: "absolute",
        }}
      />
      <div
        style={{
          background: `#fff`,
          position: "absolute",
          bottom: "15px",
          width: "100%",
          height: "60%",
        }}
      /> */}

      {loadingCollection ? (
        <Loader></Loader>
      ) : (
        <Stack
          spacing={24}
          align={"center"}
          justify={"center"}
          style={{
            width: "100%",
            maxWidth: "550px",
            padding: "18px",
            marginTop: "20px",
            borderRadius: "20px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            zIndex: 2,
            color: card.style.textColor,
            background: card.style.backgroundColor ? "white" : '',
          }}
        >
          <img
            style={{ width: "100px", borderRadius: "50%" }}
            src={card.avatar}
            alt=""
          />
          {card.data.name && <Title order={2}>{card.data.name}</Title>}
          {card.data.description && (
            <Title order={4}>{card.data.description}</Title>
          )}
          <Stack style={{ width: "100%" }}>
            {!!card.links &&
              card.links.map((item: Link) => {
                return (
                  <MyLink
                    backgroundColor={card.style.buttonColor}
                    textColor={card.style.textColor}
                    descriptionLink={item.descriptionLink}
                    titleLink={item.titleLink}
                    link={item.link}
                    id={item.id}
                    key={item.id}
                  />
                );
              })}
          </Stack>
        </Stack>
      )}

      <Flex
        style={{
          width: "170px",
          height: "25px",
          borderRadius: '15px',
          color: card.style.textColor,
          fontSize: 13,
          marginTop: '25px',
          zIndex: 3,
        }}
        justify={"center"}
        align={"center"}
      >
        <a href="https://business-card-lime.vercel.app/" target={'_blank'} rel="noreferrer">Created by @smart link</a>
      </Flex>
    </Stack>
  );
};
