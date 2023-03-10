import { Stack, Button, Tabs, Flex } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router";
import { PreviewCard } from "./PreviewCard";
import { AppLayout } from "../../../components/AppLayout";
import { TabStyles } from "../../../components/modules/builderCard/Tabs/TabStyles/TabStyles";
import { TabBio } from "../../../components/modules/builderCard/Tabs/TabBio/TabBio";
import { cardSelector, setFetchedCard } from "../../../store/slices/cardSlices";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { Context } from "../../..";
import { TabLink } from "./Tabs/TabLink/TabLinks";
import { useStyles } from "./useStyles";

export const BuilderCard = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const card = useSelector(cardSelector);
  const dispatch = useDispatch();

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const { db } = useContext(Context);

  const { classes } = useStyles();
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
      setUpdateLoading(true);
      const userRef = collection(db, "cards");

      const q = query(userRef, where("clientId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      await updateDoc(doc(db, `cards/${querySnapshot.docs[0].id}/`), {
        data: { ...card.data },
        avatar: card.avatar,
        style: { ...card.style },
        links: card.links,
        updatedAt: serverTimestamp(),
      }).then(() => {
        setUpdateLoading(false);
        showNotification({
          title: "Yeah!",
          message: "Successfully updated",
        });
      });
    } catch (e) {
      showNotification({
        title: "Error adding document",
        message: `${e}`,
        color: "red",
      });
    }
  };
  if (!user && !loading) return <Navigate to={"/login"} replace />;
  return (
    <Stack style={{ width: '100%' }}>
      {fetchLoading ? (
        "loading"
      ) : (
        <Flex
          className={classes.blocks}
        >
          <PreviewCard card={card} />
          <div
            className={classes.actionsBlock}
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
            <Tabs defaultValue={"mainInfo"}>
              <Tabs.List>
                <Tabs.Tab value="mainInfo">Bio</Tabs.Tab>
                <Tabs.Tab value="links">Links</Tabs.Tab>
                <Tabs.Tab value="styles">Styles</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="mainInfo">
                <TabBio card={card} />
              </Tabs.Panel>
              <Tabs.Panel value="links">
                <TabLink card={card} />
              </Tabs.Panel>
              <Tabs.Panel value="styles">
                <TabStyles card={card} />
              </Tabs.Panel>
            </Tabs>
            <Button
              // style={{ position: "absolute", bottom: "32px", right: "32px" }}
              disabled={updateLoading}
              onClick={handleFormSubmit}
            >
              Publish
            </Button>
          </div>
        </Flex>
      )}
    </Stack>
  );
};
