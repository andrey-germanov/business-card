import { Flex, Group, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCard,
  fontSizeBioSelector,
  setFontSizeBio,
} from "../../../../../store/slices/cardSlices";
import { UploadAvatar } from "./shared/UploadAvatar";
import { ICardResponse } from "../../../../../types/types";
import { FormInput } from "../../../../shared/FormInput";
import { EditStylesText } from "./shared/EditStylesText";
import { useStyles } from "./useStyles";

const fields = ["name", "description"];

interface IProps {
  card: ICardResponse;
}

export const TabBio = ({ card }: IProps) => {
  const dispatch = useDispatch();
  const { fontSizeDescription, fontSizeName } =
    useSelector(fontSizeBioSelector);
  const { classes } = useStyles();

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

  const editableStylesName = (e: string, field: string) => {
    const newData = {
      ...card.data,
      [field]: e
    }
    dispatch(setFontSizeBio(newData))
  };

  const fontSizeObj: any = {
    name: fontSizeName,
    description: fontSizeDescription,
  };

  const nameFieldObj: any = {
    name: 'fontSizeName',
    description: 'fontSizeDescription',
  };
  const renderFields = (fields: string[]) => {
    return fields.map((field, key) => (
      <Flex className={classes.editInput} key={key} justify={"space-between"}>
        <FormInput
          field={field}
          {...form.getInputProps(field)}
          setValues={form.setValues}
          width="100%"
        />
        <EditStylesText
          field={nameFieldObj[field]}
          fontSize={fontSizeObj[field]}
          editableStylesName={editableStylesName}
        />
      </Flex>
    ));
  };
  return (
    <form>
      <Stack spacing={24}>
        <UploadAvatar />
        <Stack spacing={24}>{renderFields(fields)}</Stack>
      </Stack>
    </form>
  );
};
