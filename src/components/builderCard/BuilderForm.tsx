import { Stack, Button, Group, TextInput, FileInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useContext, useEffect } from "react";
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
import { ICard, cardSelector, setCard } from "../../store/slices/cardSlices";
import { UploadAvatar } from "./UploadAvatar";

const fields = ["name", "description", "github", "linkedin", "youtube"];

interface IProps {
  successCreate: boolean;
}

export const BuilderForm = ({ successCreate }: IProps) => {
  const { db } = useContext(Context);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const card = useSelector(cardSelector);
  const dispatch = useDispatch();

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
      name: "name",
      description: "description",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      youtube: "https://youtube.com/",
    } as ICard,
  });
  useEffect(() => {
    form.setValues({ ...card.data });
  }, [card.data, loading]);

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

  const handleFormSubmit = async (data: ICard) => {
    if (!user?.uid) return;
    try {
      const userRef = collection(db, "cards");

      const q = query(userRef, where("clientId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      await updateDoc(doc(db, `cards/${querySnapshot.docs[0].id}/`), {
        data,
        avatar: card.avatar,
        style: { ...card.style },
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const renderFields = (fields: string[]) => {
    return fields.map((field, key) => (
      <Group align={"center"} key={key}>
        <TextInput
          defaultValue={field}
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
          style={{
            width: "100%",
          }}
        />
      </Group>
    ));
  };
  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack spacing={24}>
        <UploadAvatar />
        {renderFields(fields)}
        <Button disabled={successCreate} type={"submit"}>
          Publish
        </Button>
      </Stack>
    </form>
  );
};