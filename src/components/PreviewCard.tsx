import { Button, Flex, Stack, Loader } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { cardSelector } from "../store/slices/cardSlices";
import { useSelector } from "react-redux";
import { Context } from "../index";
import { useContext, useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { ICardResponse } from "../types/types";

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
  }, [cardFromRedux, nickname, value?.docs]);

  if (!card) return <>page not found</>;

  return (
    <Stack
      style={{
        // height: "100%",
        height: 700,
        width: 375,
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
          background: `${card.style.backgroundColor}`,
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

        {loadingCollection ? (
          <Loader></Loader>
        ) : (
          <>
            <Stack
              justify={"center"}
              align={"center"}
              spacing={5}
              style={{ color: card.style.textColor, textAlign: "center" }}
            >
              {card.data.name && <h2>{card.data.name}</h2>}
              {card.data.description && <h4>{card.data.description}</h4>}
            </Stack>
            <Stack spacing={24}>
              {card.data.linkedin && (
                <Button
                  style={{
                    padding: "0 50px",
                    backgroundColor: card.style.buttonColor,
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
                    backgroundColor: card.style.buttonColor,
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
                    backgroundColor: card.style.buttonColor,
                    color: card.style.textColor,
                  }}
                  onClick={() => navigate(`${card.data.youtube}`)}
                >
                  youtube
                </Button>
              )}
            </Stack>

            <Flex
              style={{
                width: "180px",
                height: "25px",
                backgroundColor: "black",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                color: "rgb(181 182 243)",
              }}
              justify={"center"}
              align={"center"}
            >
              I want the same page!
            </Flex>
          </>
        )}
      </Stack>
    </Stack>
  );
};
