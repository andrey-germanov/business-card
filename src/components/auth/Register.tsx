import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Form } from "./Form";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { Context } from "../../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button, Stack, Input, Text, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

export const Register = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState<string>("");

  const { db } = useContext(Context);
  const [value] = useCollection(collection(db, "cards"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const HandleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        addDoc(collection(db, `cards/`), {
          clientId: res.user.uid,
          nickname,
          createdAt: serverTimestamp()
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const validateNickname = value?.docs.filter(
    (doc) => doc.data().data.nickname === nickname
  );

  const disableSignUpButton = nickname.length < 6 || !!validateNickname?.length;

  return (
    <Stack spacing={0}>
      <Group>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {!!validateNickname?.length && (
          <Text>this nickname already exists</Text>
        )}
      </Group>
      <Form
        disableSignUpButton={disableSignUpButton}
        error={error}
        title={"sign up"}
        handleClick={HandleRegister}
      />
    </Stack>
  );
};
