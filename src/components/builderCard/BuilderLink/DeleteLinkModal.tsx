import React, { SetStateAction, useState } from "react";
import { Modal, Stack, TextInput, Group, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLink,
  linksSelector,
  setLinks,
  updateLink,
} from "../../../store/slices/cardSlices";
import { Link } from "../../../types/types";
import { useEffect } from "react";
import { FormInput } from "../../shared/FormInput";
import { MyLink } from "../../shared/MyLink";

type IProps = {
  id: number;
};

export const DeleteLinkModal = ({ id }: IProps) => {
  const [opened, setOpened] = useState(false);
  const [link, setLink] = useState<Link[] | []>([]);
  const links = useSelector(linksSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentLink = links.filter((item) => item.id === id);
    setLink(currentLink);
  }, [opened]);

  const openModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpened(true);
  };

  const handleDeleteLink = (id: number) => {
    dispatch(deleteLink(id));
    setOpened(false);
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
        {link.length && (
          <MyLink
            descriptionLink={link[0].descriptionLink}
            titleLink={link[0].titleLink}
            link={link[0].link}
            id={link[0].id}
            editableLink
          />
        )}
        <Button onClick={() => handleDeleteLink(link[0].id)}>Delete?</Button>
      </Modal>
      <div style={{ fontSize: 12 }} onClick={(e) => openModal(e)}>
        Delete
      </div>
    </>
  );
};
