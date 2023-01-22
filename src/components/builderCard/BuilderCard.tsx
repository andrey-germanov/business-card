import { Flex, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router";
import { PreviewCard } from "./Card/Card";
import { WrapperApp } from "../WrapperApp";
import { BuilderColor } from "./BuilderColor";
import { BuilderForm } from "./BuilderForm";
import { setCard, cardSelector } from "../../store/slices/cardSlices";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from "../../index";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

export const BuilderCard = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const { db } = useContext(Context);
  const card = useSelector(cardSelector);
  const dispatch = useDispatch();
  const [successCreate, setSuccessCreate] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCard = async () => {
    const userRef = collection(db, "cards");

    const q = query(userRef, where("clientId", "==", user?.uid));
    const querySnapshot = await getDocs(q);

    dispatch(setCard({ ...querySnapshot.docs[0].data() }));
  };
  useEffect(() => {
    setSuccessCreate(false);
    fetchCard();
  }, [loading, card.nickname]);

  if (!user && !loading) return <Navigate to={"/login"} replace />;

  return (
    <WrapperApp>
      <div
        style={{ width: "90%", boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 15px", borderRadius: '30px', padding: '50px' }}
      >
        <Title order={1}>BuilderCard</Title>
        {card.nickname && (
          <a
            href={`${"https://business-card-lime.vercel.app/" + card.nickname}`}
            target={"_blank"}
            rel="noreferrer"
          >
            link to your profile
          </a>
        )}
        <Flex justify={"space-between"} align={"center"}>
          <BuilderForm successCreate={successCreate} />
          <BuilderColor />
          <PreviewCard />
        </Flex>
      </div>
    </WrapperApp>
  );
};
