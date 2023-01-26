import React, { useState } from "react";
import { Modal, Stack, TextInput, Group, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setLinks } from "../../store/slices/cardSlices";

export const BuilderLinksModal = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    validate: zodResolver(
      z.object({
        titleLink: z.string().min(5),
        descriptionLink: z.string().min(8),
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

  const handleFormSubmit = (data: any) => {
    dispatch(setLinks([data]));
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
              <TextInput
                label={"Title link"}
                placeholder={"title link"}
                {...form.getInputProps("titleLink")}
                rightSection={
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => form.setValues({ titleLink: "" })}
                  >
                    x
                  </div>
                }
                style={{
                  width: "100%",
                }}
              />
              <TextInput
                label={"Description link"}
                placeholder={"Description link"}
                {...form.getInputProps("descriptionLink")}
                rightSection={
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => form.setValues({ descriptionLink: "" })}
                  >
                    x
                  </div>
                }
                style={{
                  width: "100%",
                }}
              />

              <TextInput
                label={"Link"}
                placeholder={"Link"}
                {...form.getInputProps("link")}
                rightSection={
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => form.setValues({ link: "" })}
                  >
                    x
                  </div>
                }
                style={{
                  width: "100%",
                }}
              />
              <Button type={"submit"}>Add</Button>
            </Stack>
          </Stack>
        </form>
      </Modal>
      <Button onClick={() => setOpened(true)}>Add button</Button>
    </>
  );
};
