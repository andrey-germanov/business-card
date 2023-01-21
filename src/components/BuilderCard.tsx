import {
  Group,
  Input,
  Flex,
  Button,
  TextInput,
  Stack,
  FileInput,
  SegmentedControl,
  ColorPicker,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router";
import {
  useCollection,
  useCollectionOnce,
  useDocument,
} from "react-firebase-hooks/firestore";
import { Card, PreviewCard } from "./PreviewCard";
import { IResponseCards } from "../types/types";
import { WrapperApp } from './WrapperApp';

// type Button = {
//   [key:string]: string;
// };

// TODO: default card will come into database
// const tempCard: ICard = {
//   avatar: "image",
//   name: "german",
//   description: "about german",
// };

const fields = [
  "nickname",
  "name",
  "description",
  // "avatar",
  "github",
  "linkedin",
  "youtube",
];

export const BuilderCard = () => {
  const [card, setCard] = useState<Card>();
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [buttonColor, setButtonColor] = useState("#e36464");
  const [textColor, setTextColor] = useState("black");
  const [visible, setVisible] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);
  const { db } = useContext(Context);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [value] = useCollection(
    collection(db, "cards"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const form = useForm({
    validate: zodResolver(
      z.object({
        nickname: z.string().min(6, "Minimun 6 characters"),
        name: z.string().min(5, "Minimun 5 characters"),
        description: z.string().min(8, "Minimun 8 characters"),
        linkedin: z
          .string()
          .startsWith("https://", { message: "Must provide secure URL" }),
        github: z
          .string()
          .startsWith("https://", { message: "Must provide secure URL" }),
        youtube: z
          .string()
          .startsWith("https://", { message: "Must provide secure URL" }),
      })
    ),
    validateInputOnBlur: true,
    initialValues: {
      // avatar: "",
      name: "",
      description: "",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      youtube: "https://youtube.com/",
    } as Card,
  });

  useEffect(() => {
    setCard(form.values);
  }, [form.values]);

  useEffect(() => {
    setSuccessCreate(false);
  }, []);

  if (!user && !loading) return <Navigate to={"/login"} replace />;

  const handleFormSubmit = async (data: Card) => {
    console.log(data);
    setVisible(true);
    try {
      const docId = await addDoc(collection(db, `cards/`), {
        clientId: user?.uid,
        data,
        style: {
          backgroundColor,
          buttonColor,
          textColor,
        },
      });
      // TODO: show toast for 2 a few seconds
      setSuccessCreate(!!docId.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setVisible(false);
  };
  const renderFields = (fields: string[]) => {
    return fields.map((field, key) => (
      <Group align={"center"} key={key}>
        <TextInput
          label={field}
          placeholder={field}
          {...form.getInputProps(field)}
          rightSection={
            <div
              style={{ cursor: "pointer" }}
              onClick={() => form.setValues({ [field]: "" })}
            >
              x
            </div>
          }
        />
      </Group>
    ));
  };
  const validateNickname = value?.docs.filter((doc) => (
    doc.data().data.nickname === form.values.nickname
  ));
  return (
    <WrapperApp>
      <h1>BuilderCard</h1>
      {successCreate && "success publish"}
      <Flex justify={"space-between"} align={"center"} p={20}>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack spacing={24}>
            {renderFields(fields)}
            <Button disabled={!!validateNickname?.length} type={"submit"}>Publish</Button>
          </Stack>
        </form>
        <Stack>
          <Text>Background color own app</Text>
          <ColorPicker
            format="hex"
            onChange={setBackgroundColor}
            swatches={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />
          <Text>Background color buttons</Text>
          <ColorPicker
            format="hex"
            onChange={setButtonColor}
            defaultValue="#e36464"
            swatches={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />
          <Text>Color text</Text>
          <ColorPicker
            format="hex"
            onChange={setTextColor}
            defaultValue="black"
            swatches={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />
        </Stack>
        <PreviewCard
          textColor={textColor}
          buttonColor={buttonColor}
          backgroundColor={backgroundColor}
          card={card}
        />
      </Flex>
    </WrapperApp>
  );
};
