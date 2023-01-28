import { Flex, Group, Stack, Title, Button, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router";
import { PreviewCard } from "../components/builderCard/PreviewCard";
import { WrapperApp } from "../components/WrapperApp";
import { BuilderColor } from "../components/builderCard/BuilderColor";
import { BuilderForm } from "../components/builderCard/BuilderForm";
import {
  setCard,
  cardSelector,
  setFetchedCard,
} from "../store/slices/cardSlices";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { Context } from "../index";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BuilderLink } from "../components/builderCard/BuilderLink";
import { IconMessageCircle, IconSettings, IconPhoto } from "@tabler/icons";

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

  const handleFormSubmit = async () => {
    if (!user?.uid) return;
    try {
      const userRef = collection(db, "cards");

      const q = query(userRef, where("clientId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      await updateDoc(doc(db, `cards/${querySnapshot.docs[0].id}/`), {
        data: { ...card.data },
        avatar: card.avatar,
        style: { ...card.style },
        links: card.links,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  if (!user && !loading) return <Navigate to={"/login"} replace />;
  return (
    <WrapperApp>
      <Stack>
        {fetchLoading ? (
          "loading"
        ) : (
          <div
            style={{
              display: "flex",
              gap: "50px",
            }}
          >
            <div
              style={{
                width: "500px",
                maxWidth: '100%',
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 15px",
                borderRadius: "30px",
                padding: "50px",
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
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
              <Tabs defaultValue={'mainInfo'}>
                <Tabs.List>
                  <Tabs.Tab value="mainInfo">Bio</Tabs.Tab>
                  <Tabs.Tab value="links">Links</Tabs.Tab>
                  <Tabs.Tab value="styles">Styles</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="mainInfo">
                  <BuilderForm card={card} />
                </Tabs.Panel>
                <Tabs.Panel value="links">
                  <BuilderLink card={card} />
                </Tabs.Panel>
                <Tabs.Panel value="styles">
                  <BuilderColor card={card} />
                </Tabs.Panel>
              </Tabs>
              <Button onClick={handleFormSubmit}>Publish</Button>
            </div>
            <PreviewCard card={card} />
          </div>
        )}
      </Stack>
    </WrapperApp>
  );
};
