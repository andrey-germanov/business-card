import {
  ColorPicker,
  Stack,
  Text,
  Flex,
  Center,
  SegmentedControl,
  Accordion,
} from "@mantine/core";
import {
  setBackgroundImage,
  setButtonColor,
  setBackgroundColor,
  setTextColor,
} from "../../../../../store/slices/cardSlices";
import { useDispatch } from "react-redux";
import { ICardResponse } from "../../../../../types/types";
import { backgrounds } from "./const";

interface IProps {
  card: ICardResponse;
}

export const TabStyles = ({ card }: IProps) => {
  const dispatch = useDispatch();

  const handleChangeBackgroundColor = (e: string) => {
    const data = { backgroundColor: e };
    dispatch(setBackgroundImage(""));
    dispatch(setBackgroundColor(data));
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

    dispatch(setBackgroundColor({ backgroundColor: "" }));
    dispatch(setBackgroundImage(data));
  };

  return (
    <Stack style={{ alignSelf: "start" }}>
      <Accordion defaultValue="customicStyle">
        <Accordion.Item value="customicStyle">
          <Accordion.Control>Create customic style</Accordion.Control>
          <Accordion.Panel>
            <Flex justify={"space-between"}>
              <Stack>
                <Text size={12}>Background color</Text>
                <ColorPicker
                  format="hex"
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
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="backgroundImage">
          <Accordion.Control>Select background image</Accordion.Control>
          <Accordion.Panel>
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
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
};
