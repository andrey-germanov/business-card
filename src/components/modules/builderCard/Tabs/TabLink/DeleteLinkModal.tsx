import React, { useState } from "react";
import { Modal, Stack, Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLink,
  linksSelector,
} from "../../../../../store/slices/cardSlices";
import { Link } from "../../../../../types/types";
import { useEffect } from "react";
import { MyLink } from "../../../../shared/MyLink";

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
        <Stack spacing={24}>
          <div>
            {link.length && (
              <MyLink
                descriptionLink={link[0].descriptionLink}
                titleLink={link[0].titleLink}
                link={link[0].link}
                id={link[0].id}
                editableLink
              />
            )}
          </div>
          <Button
            style={{ alignSelf: "end" }}
            onClick={() => handleDeleteLink(link[0].id)}
          >
            Delete?
          </Button>
        </Stack>
      </Modal>
      <div
        style={{ fontSize: 12, cursor: "pointer" }}
        onClick={(e) => openModal(e)}
      >
        Delete
      </div>
    </>
  );
};
