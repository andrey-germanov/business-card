import { Button, Flex, Stack, Loader, Title } from "@mantine/core";
import { useParams } from "react-router";
import { Context } from "../../../index";
import { useContext, useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { ICardResponse } from "../../../types/types";

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
          borderRadius: "20px",
          margin: 0,
        }}
        align={"center"}
        spacing={0}
      >

        <div
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
        />

        {loadingCollection ? (
          <Loader></Loader>
        ) : (
          <Stack
            spacing={24}
            align={"center"}
            justify={"center"}
            style={{
              width: "100%",
              maxWidth: '550px',
              background: "white",
              padding: "18px",
              marginTop: "20px",
              borderRadius: "20px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              zIndex: 2,
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
              {card.data.linkedin && (
                <Button
                  style={{
                    padding: "0",
                    backgroundColor: `${card.style.backgroundColor}`,
                    color: card.style.textColor,
                  }}
                >
                  <a
                    style={{ color: "#fff" }}
                    href={card.data.linkedin}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    linkedin
                  </a>
                </Button>
              )}
              {card.data.github && (
                <Button
                  style={{
                    padding: "0",
                    backgroundColor: `${card.style.backgroundColor}`,
                    color: card.style.textColor,
                  }}
                >
                  <a
                    style={{ color: "#fff" }}
                    href={card.data.github}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    github
                  </a>
                </Button>
              )}
              {card.data.youtube && (
                <Button
                  style={{
                    padding: "0",
                    backgroundColor: card.style.backgroundColor,
                    color: card.style.textColor,
                  }}
                >
                  <a
                    style={{ color: "#fff" }}
                    href={card.data.youtube}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    youtube
                  </a>
                </Button>
              )}
            </Stack>
          </Stack>
        )}

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
  );
};
