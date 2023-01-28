import React, { SetStateAction, useState } from "react";
import { Modal, Stack, TextInput, Group, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  linksSelector,
  setLinks,
  updateLink,
} from "../../store/slices/cardSlices";
import { Link } from "../../types/types";
import { useEffect } from "react";
import { FormInput } from "../shared/FormInput";

type IProps = {
  id: number;
};

export const EditLinkModal = ({ id }: IProps) => {
  const [opened, setOpened] = useState(false);
  const links = useSelector(linksSelector);
  const dispatch = useDispatch();

  const form = useForm({
    validate: zodResolver(
      z.object({
        titleLink: z.string().min(5),
        link: z
          .string()
          .startsWith("https://", { message: "Must provide secure URL" }),
      })
    ),
    validateInputOnBlur: true,
    initialValues: {
      titleLink: "",
      descriptionLink: "",
      link: "https://",
    },
  });
  useEffect(() => {
    const currentLink = links.filter((item) => item.id === id)[0];
    form.setValues(currentLink);
  }, [opened]);

  const handleFormSubmit = (data: Omit<Link, "id">) => {
    dispatch(updateLink({ ...data, id }));
    setOpened(false);
    form.reset();
  };

  const handleLinkEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpened(true);
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Builder links!"
        centered
        size={750}
        padding={24}
      >
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack spacing={40}>
            <Stack
              style={{
                width: "80%",
                margin: "0 auto",
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 15px",
                padding: 24,
              }}
            >
              <FormInput field="Title link" {...form.getInputProps('titleLink')} setValues={form.setValues}/>
              <FormInput field="Description link" {...form.getInputProps('descriptionLink')} setValues={form.setValues}/>
              <FormInput field="Link" {...form.getInputProps('link')} setValues={form.setValues}/>
              <Button type={"submit"}>Edit</Button>
            </Stack>
          </Stack>
        </form>
      </Modal>
      <div style={{ fontSize: 12 }} onClick={(e) => handleLinkEdit(e)}>Edit </div>
    </>
  );
};
