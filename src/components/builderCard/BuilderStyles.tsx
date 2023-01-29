import {
  ColorPicker,
  Progress,
  Stack,
  Text,
  Group,
  FileButton,
  Flex,
  Button,
  Radio,
  Center,
  SegmentedControl,
} from "@mantine/core";
import {
  cardSelector,
  setAvatar,
  setBackgroundImage,
  setButtonColor,
  setStyles,
  setTextColor,
} from "../../store/slices/cardSlices";
import { useDispatch, useSelector } from "react-redux";
import { ICardResponse } from "../../types/types";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../..";

interface IProps {
  card: ICardResponse;
}

const backgrounds = [
  {
    id: 1,
    path: "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBiYWNrZ3JvdW5kJTIwc3RhcnxlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  {
    id: 2,
    path: "https://img.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-599.jpg?w=2000",
  },
  {
    id: 3,
    path: "https://i.pinimg.com/564x/1c/34/7a/1c347accaab2d81c2f96d20575f96c36.jpg",
  },
  {
    id: 4,
    path: "https://images.unsplash.com/photo-1569878698892-f14a5b008967?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    path: "https://images.unsplash.com/photo-1569938297878-0bd7b8a1476a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    path: "https://images.unsplash.com/photo-1569597520153-e5cbab5ab736?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 7,
    path: "https://images.unsplash.com/photo-1569413978926-55786fc0bb4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 8,
    path: "https://images.unsplash.com/flagged/photo-1570735821643-6d4126137675?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 9,
    path: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxidXNpbmVzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 10,
    path: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMwfHxidXNpbmVzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
];
export const BuilderStyles = ({ card }: IProps) => {
  const dispatch = useDispatch();

  const handleChangeBackgroundColor = (e: string) => {
    const data = { backgroundColor: e };
    dispatch(setBackgroundImage(""));
    dispatch(setStyles(data));
  };

  const handleChangeBackgroundButtonColor = (e: string) => {
    const data = { buttonColor: e };
    dispatch(setButtonColor(data));
  };

  const handleChangeTextColor = (e: string) => {
    const data = { textColor: e };

    dispatch(setTextColor(data));
  };

  const handleChangeBackgroundImage = (e: string) => {
    const data = backgrounds.filter((item) => item.id === Number(e))[0].path;

    dispatch(setStyles({ backgroundColor: "" }));
    dispatch(setBackgroundImage(data));
  };

  return (
    <Stack style={{ alignSelf: "start" }}>
      <Text>Create customic style</Text>
      <Flex justify={'space-between'}>
        <Stack>
          <Text size={12}>Background color</Text>
          <ColorPicker
            format="rgba"
            defaultValue={card.style.backgroundColor}
            onChange={handleChangeBackgroundColor}
          />
        </Stack>
        <Stack>
          <Text size={12}>Background button color</Text>
          <ColorPicker
            format="rgba"
            defaultValue={card.style.buttonColor}
            onChange={handleChangeBackgroundButtonColor}
          />
        </Stack>
        <Stack>
          <Text size={12}>Text color</Text>
          <ColorPicker
            format="rgba"
            defaultValue={card.style.textColor}
            onChange={handleChangeTextColor}
          />
        </Stack>
      </Flex>
      <Text>Or select background image</Text>
      <SegmentedControl
        onChange={(e) => handleChangeBackgroundImage(e)}
        style={{
          flexWrap: "wrap",
        }}
        data={backgrounds.map((item) => {
          return {
            value: `${item.id}`,
            label: (
              <Center>
                <img
                  width={"100px"}
                  height={"170px"}
                  src={item.path}
                  alt={item.path}
                />
              </Center>
            ),
          };
        })}
      />
    </Stack>
  );
};
