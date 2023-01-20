import {
  Group,
  Input,
  Flex,
  Button,
  TextInput,
  Stack,
  FileInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router";
import { set, ref } from 'firebase/database';

// type Button = {
//   [key:string]: string;
// };

interface ICard {
  name: string;
  description: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
}

// TODO: default card will come into database
const tempCard: ICard = {
  avatar: "image",
  name: "german",
  description: "about german",
};

const fields = [
  "name",
  "description",
  // "avatar",
  "github",
  "linkedin",
  "youtube",
];

export const BuilderCard = () => {
  const [card, setCard] = useState<ICard>(tempCard);
  // const { user } = useAuth();
  const { db } = useContext(Context);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const form = useForm({
    validate: zodResolver(
      z.object({
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
      // button: [],
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      youtube: "https://youtube.com/",
    } as ICard,
  });
  if (!user && !loading) return <Navigate to={"/login"} replace />;

  const handleFormSubmit = async (data: ICard) => {
    // user
    setCard(data);
    // TODO: send data to database
    try {
      const docRef = await addDoc(collection(db, "cards"), {
        clientId: user?.uid,
        data,
      });
      // set(ref(db, 'users/' + data.name), {
      //   clientId: user?.uid,
      //   data,
      // })
      console.log("Document written with ID: ", docRef.id);
      console.log("Document ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const renderFields = (fields: string[]) => {
    return fields.map((field) => (
      <Group align={"center"}>
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
  return (
    <div>
      <h1>BuilderCard</h1>
      <Flex justify={"space-between"} align={"center"} p={20}>
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack spacing={24}>
            {renderFields(fields)}
            <Button type={"submit"}>submit</Button>
          </Stack>
        </form>

        <div
          style={{
            height: 500,
            width: 325,
            background: "gray",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <div>{card.name}</div>
          <div>{card.description}</div>
          <div>{card.avatar}</div>
          <div>
            <a href={`${card.linkedin}`}>linkedin</a>
          </div>
          <div>
            <a href={`${card.github}`}>github</a>
          </div>
          <div>
            <a href={`${card.youtube}`}>youtube</a>
          </div>
        </div>
      </Flex>
    </div>
  );
};
