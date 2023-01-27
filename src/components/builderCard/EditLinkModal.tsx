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

type IProps = {
  id: number;
};

export const EditLinkModal = ({ id }: IProps) => {
  const [opened, setOpened] = useState(false);
  const [currentLink, setCurrentLink] = useState<SetStateAction<Link | []>>([]);
  const links = useSelector(linksSelector);
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
              <TextInput
                label={"Title link"}
                placeholder={"title link"}
                {...form.getInputProps("titleLink")}
                rightSection={
                  <div
                    style={{ cursor: "pointer", fontSize: 10, opacity: .6 }}
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
                    style={{ cursor: "pointer", fontSize: 10, opacity: .6 }}
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
                    style={{ cursor: "pointer", fontSize: 10, opacity: .6 }}
                    onClick={() => form.setValues({ link: "" })}
                  >
                    x
                  </div>
                }
                style={{
                  width: "100%",
                }}
              />
              <Button type={"submit"}>Edit</Button>
            </Stack>
          </Stack>
        </form>
      </Modal>
      <div style={{ fontSize: 12 }} onClick={(e) => handleLinkEdit(e)}>Edit </div>
    </>
  );
};
