import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { RegisterForm } from "./RegisterForm";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { Context } from "../../index";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Stack, Input, Text, Group } from "@mantine/core";
import { initialState } from "../../store/slices/cardSlices";

const startedInfo = initialState;

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
          ...startedInfo,
          clientId: res.user.uid,
          nickname,
          createdAt: serverTimestamp(),
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const validateNickname = value?.docs.filter(
    (doc) => doc.data().nickname === nickname
  );

  const validateInput = (value: string) =>
    value.replace(/^[А-Яа-яёЁ]+(?:[-'\s][А-Яа-яёЁ]+)*$/, "").trim();
  const disableSignUpButton = nickname.length < 6 || !!validateNickname?.length;

  return (
    <Stack spacing={16}>
      <Group>
        <Input
          type="text"
          value={nickname}
          placeholder="Nickname"
          onChange={(e) => setNickname(validateInput(e.target.value))}
        />
        {!!validateNickname?.length && (
          <Text>this nickname already exists</Text>
        )}
      </Group>
      <RegisterForm
        disableSignUpButton={disableSignUpButton}
        error={error}
        title={"sign up"}
        handleClick={HandleRegister}
      />
    </Stack>
  );
};
