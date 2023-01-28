import React, { useState } from "react";
import { Modal, Stack, TextInput, Group, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setLinks } from "../../store/slices/cardSlices";
import { Link } from "../../types/types";
import { FormInput } from '../shared/FormInput';
import { useEffect } from 'react';

export const BuilderLinksModal = () => {
  const [opened, setOpened] = useState(false);
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
  
  const handleFormSubmit = (data: Omit<Link, "id">) => {
    const newData = [
      {
        ...data,
        id: Date.now(),
      },
    ];
    dispatch(setLinks(newData));
    setOpened(false);
    form.reset();
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
              <Button type={"submit"}>Add</Button>
            </Stack>
          </Stack>
        </form>
      </Modal>
      <Button variant={'light'} onClick={() => setOpened(true)}>Add button</Button>
    </>
  );
};
