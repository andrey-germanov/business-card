import { Flex, Group, Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router";
import { PreviewCard } from "./Card/PreviewCard";
import { WrapperApp } from "../WrapperApp";
import { BuilderColor } from "./BuilderColor";
import { BuilderForm } from "./BuilderForm";
import {
  setCard,
  cardSelector,
  setFetchedCard,
} from "../../store/slices/cardSlices";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from "../../index";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

export const BuilderCard = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const { db } = useContext(Context);

  const [fetchLoading, setFetchLoading] = useState(false);
  const card = useSelector(cardSelector);

  const dispatch = useDispatch();

  const fetchCard = async () => {
    setFetchLoading(true);
    const userRef = collection(db, "cards");
    const q = query(userRef, where("clientId", "==", user?.uid));
    const querySnapshot = await getDocs(q);

    dispatch(setFetchedCard({ ...querySnapshot.docs[0].data() }));
    setFetchLoading(false);
  };
  useEffect(() => {
    fetchCard();
  }, [loading, card.nickname]);
  console.log(user?.email);
  if (!user && !loading) return <Navigate to={"/login"} replace />;
  return (
    <WrapperApp>
      <Stack>
        <Title order={1}>BuilderCard</Title>
        {fetchLoading ? (
          "loading"
        ) : (
          <div style={{
            display: 'flex',
            gap:'50px'
          }}>
            <div
              style={{
                width: "90%",
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 15px",
                borderRadius: "30px",
                padding: "50px",
              }}
            >
              {card.nickname && (
                <a
                  href={`${
                    "https://business-card-lime.vercel.app/" + card.nickname
                  }`}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  link to your profile
                </a>
              )}
              <Flex justify={"space-between"} align={"center"}>
                <BuilderForm card={card} />
                <BuilderColor card={card} />
              </Flex>
            </div>
            <PreviewCard card={card} />
          </div>
        )}
      </Stack>
    </WrapperApp>
  );
};
