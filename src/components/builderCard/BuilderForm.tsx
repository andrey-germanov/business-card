import {
  Stack,
  Button,
  Group,
  TextInput,
  Flex,
  ActionIcon,
  ThemeIcon,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../..";
import { ICard, setCard } from "../../store/slices/cardSlices";
import { UploadAvatar } from "./UploadAvatar";
import { ICardResponse, Link } from "../../types/types";
import { BuilderLinksModal } from "./BuilderLinksModal";
import { MyLink } from "./MyLink";
import { IconAdjustments, IconPhoto } from "@tabler/icons";
import { FormInput } from "../shared/FormInput";

const fields = ["name", "description"];

interface IProps {
  card: ICardResponse;
}

export const BuilderForm = ({ card }: IProps) => {
  const { db } = useContext(Context);
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();

  const form = useForm({
    validate: zodResolver(
      z.object({
        name: z.string().min(5, "Minimun 5 characters"),
        description: z.string().min(8, "Minimun 8 characters"),
      })
    ),
    validateInputOnBlur: true,
    initialValues: {
      name: "name",
      description: "description",
    },
  });
  useEffect(() => {
    form.setValues({ ...card.data });
  }, []);

  useEffect(() => {
    const newData = {
      ...card,
      data: {
        ...card.data,
        ...form.values,
      },
    };
    dispatch(setCard(newData));
  }, [form.values]);

  // const handleFormSubmit = async (data: any) => {
  //   if (!user?.uid) return;
  //   try {
  //     const userRef = collection(db, "cards");

  //     const q = query(userRef, where("clientId", "==", user.uid));
  //     const querySnapshot = await getDocs(q);

  //     await updateDoc(doc(db, `cards/${querySnapshot.docs[0].id}/`), {
  //       data,
  //       avatar: card.avatar,
  //       style: { ...card.style },
  //       links: card.links,
  //       updatedAt: serverTimestamp(),
  //     });
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  const renderFields = (fields: string[]) => {
    return fields.map((field, key) => (
      <FormInput
        key={key}
        field={field}
        {...form.getInputProps(field)}
        setValues={form.setValues}
      />
    ));
  };
  return (
    <form>
      <Stack spacing={24}>
        <UploadAvatar />
        {renderFields(fields)}
      </Stack>
    </form>
  );
};
