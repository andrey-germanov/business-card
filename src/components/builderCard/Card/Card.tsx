import { Button, Flex, Stack, Loader, Text, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { cardSelector } from "../../../store/slices/cardSlices";
import { useSelector } from "react-redux";
import { Context } from "../../../index";
import { useContext, useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { ICardResponse } from "../../../types/types";

export const PreviewCard = () => {
  const [card, setCard] = useState<ICardResponse | null>(null);
  const navigate = useNavigate();
  const cardFromRedux = useSelector(cardSelector);

  const { nickname } = useParams();
  const { db } = useContext(Context);

  const [value, loadingCollection] = useCollection(collection(db, "cards"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  useEffect(() => {
    if (nickname) {
      const finded =
        value?.docs &&
        value?.docs.filter((doc) => doc.data().nickname === nickname);

      if (finded) {
        setCard(finded[0].data() as ICardResponse);
      }
    } else {
      setCard(cardFromRedux);
    }
  }, [cardFromRedux, nickname, loadingCollection]);

  if (!card) return <>loading</>;
  if (!card.data) return <>page not found</>;

  return (
    <Stack
      style={{
        height: 700,
        width: 375,
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
            borderBottomRightRadius: "20px"
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
              width: "90%",
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
              src="https://media.licdn.com/dms/image/D4E35AQEobt_RK4dfZw/profile-framedphoto-shrink_100_100/0/1668525720508?e=1674993600&v=beta&t=R9GEeB_qCzy24YbHZsh37TK7qIqPA-osXDCDWUKRwFY"
              alt=""
            />
            {card.data.name && <Title order={2}>{card.data.name}</Title>}
            {card.data.description && (
              <Title order={4}>{card.data.description}</Title>
            )}
            <Stack>
            {card.data.linkedin && (
              <Button
                style={{
                  padding: "0 50px",
                  backgroundColor: `${card.style.backgroundColor}`,
                  color: card.style.textColor,
                }}
                onClick={() => navigate(`${card.data.linkedin}`)}
              >
                linkedin
              </Button>
            )}
            {card.data.github && (
              <Button
                style={{
                  padding: "0 50px",
                  backgroundColor: `${card.style.backgroundColor}`,
                  color: card.style.textColor,
                }}
                onClick={() => navigate(`${card.data.github}`)}
              >
                github
              </Button>
            )}
            {card.data.youtube && (
              <Button
                style={{
                  padding: "0 50px",
                  backgroundColor: card.style.backgroundColor,
                  color: card.style.textColor,
                }}
                onClick={() => navigate(`${card.data.youtube}`)}
              >
                youtube
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
            fontSize: 13
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
