import { Button, Flex, Loader, Stack } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import { Context } from "../index";
import { IResponseCards } from "../types/types";
import { Link } from 'react-router-dom';

export const Card = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const { db } = useContext(Context);

  const [value, loadingCollection, errorCollection] = useCollection(
    collection(db, "cards"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const finded =
    value?.docs &&
    (value?.docs
      .filter((doc) => doc.data().data.nickname === nickname));

  if (loadingCollection) return <Loader></Loader>;
  if (!finded) return <></>;
  const findedCard = finded[0].data() as IResponseCards;
  return (
    <Stack
      style={{
        height: 750,
        width: 525,
        maxWidth: '100%',
        background: "black",
        borderRadius: "20px",
        padding: "15px",
        margin: '0 auto'
      }}
    >
      <Stack
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "20px",
          padding: "0 20px",
          background: `${findedCard.style.backgroundColor}`,
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
          style={{ color: findedCard.style.textColor, textAlign: "center" }}
        >
          {/* <div>@{findedCard.data.nickname}</div>
          <div>{findedCard.data.avatar}</div> */}
          <img
            style={{ width: "120px", borderRadius: "10%" }}
            src="https://i.work.ua/sent_photo/f/e/a/fea111ab933ee50d40ac84debf0c4502.jpg"
            alt=""
          />
          {findedCard.data.name && <h2>{findedCard.data.name}</h2>}
          {findedCard.data.description && <h4>{findedCard.data.description}</h4>}
        </Stack>
        <Stack spacing={24}>
          {findedCard.data.linkedin && (
            <Button
              style={{
                padding: "0 50px",
                backgroundColor: findedCard.style.buttonColor,
                color: findedCard.style.textColor,
              }}
              onClick={() => navigate(`${findedCard.data.linkedin}`)}
            >
              linkedin
            </Button>
          )}
          {findedCard.data.github && (
            <Button
              style={{
                padding: "0 50px",
                backgroundColor: findedCard.style.buttonColor,
                color: findedCard.style.textColor,
              }}
              onClick={() => navigate(`${findedCard.data.github}`)}
            >
              github
            </Button>
          )}
          {findedCard.data.youtube && (
            <Button
              style={{
                padding: "0 50px",
                backgroundColor: findedCard.style.buttonColor,
                color: findedCard.style.textColor,
              }}
              onClick={() => navigate(`${findedCard.data.youtube}`)}
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
          }}
          justify={"center"}
          align={"center"}
        >
         
         <Link
            style={{
              color: 'rgb(181 182 243)',
              textDecoration: "none",
            }}
            to={"/register"}
          >
            I want the same page
          </Link>
        </Flex>
      </Stack>
    </Stack>
  );
};
