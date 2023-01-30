import { Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCard } from "../../../../../store/slices/cardSlices";
import { UploadAvatar } from "./shared/UploadAvatar";
import { ICardResponse } from "../../../../../types/types";
import { FormInput } from "../../../../shared/FormInput";

const fields = ["name", "description"];

interface IProps {
  card: ICardResponse;
}

export const BuilderForm = ({ card }: IProps) => {
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
