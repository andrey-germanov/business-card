import { Flex } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router";
import { PreviewCard } from "./PreviewCard";
import { WrapperApp } from "./WrapperApp";
import { BuilderColor } from "./BuilderColor";
import { BuilderForm } from "./BuilderForm";
import { setCard, cardSelector } from "../store/slices/cardSlices";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from "../index";
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
  }, [loading]);

  if (!user && !loading) return <Navigate to={"/login"} replace />;
  return (
    <WrapperApp>
      <h1>BuilderCard</h1>
      <a
        href={`${"https://business-card-lime.vercel.app/" + card.nickname}`}
        target={"_blank"}
        rel="noreferrer"
      >
        link to your profile
      </a>
      <Flex justify={"space-between"} align={"center"} p={20}>
        <BuilderForm successCreate={successCreate} />
        <BuilderColor />
        <PreviewCard />
      </Flex>
    </WrapperApp>
  );
};
