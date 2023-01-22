import { ColorPicker, Stack, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { cardSelector, setCard } from "../store/slices/cardSlices";
import { useDispatch } from "react-redux";

export const BuilderColor = () => {
  const card = useSelector(cardSelector);
  const dispatch = useDispatch();

  const newData = (key: string, e: string) => {
    return {
      ...card,
      style: {
        ...card.style,
        [key]: e,
      },
    };
  };
  const handleChangeBackgroundColor = (e: string) => {
    const data = newData("backgroundColor", e);

    dispatch(setCard(data));
  };

  const handleChangeButtonColor = (e: string) => {
    const data = newData("buttonColor", e);

    dispatch(setCard(data));
  };

  const handleChangeTextColor = (e: string) => {
    const data = newData("textColor", e);

    dispatch(setCard(data));
  };
  return (
    <Stack>
      <Text>Background color own app</Text>
      <ColorPicker
        format="hex"
        onChange={handleChangeBackgroundColor}
        swatches={[
          "#25262b",
          "#868e96",
          "#fa5252",
          "#e64980",
          "#be4bdb",
          "#7950f2",
          "#4c6ef5",
          "#228be6",
          "#15aabf",
          "#12b886",
          "#40c057",
          "#82c91e",
          "#fab005",
          "#fd7e14",
        ]}
        defaultValue="#4e68de"
      />
      <Text>Background color buttons</Text>
      <ColorPicker
        format="hex"
        onChange={handleChangeButtonColor}
        defaultValue="#6486e3"
        swatches={[
          "#25262b",
          "#868e96",
          "#fa5252",
          "#e64980",
          "#be4bdb",
          "#7950f2",
          "#4c6ef5",
          "#228be6",
          "#15aabf",
          "#12b886",
          "#40c057",
          "#82c91e",
          "#fab005",
          "#fd7e14",
        ]}
      />
      <Text>Color text</Text>
      <ColorPicker
        format="hex"
        onChange={handleChangeTextColor}
        defaultValue="#fff"
        swatches={[
          "#25262b",
          "#868e96",
          "#fa5252",
          "#e64980",
          "#be4bdb",
          "#7950f2",
          "#4c6ef5",
          "#228be6",
          "#15aabf",
          "#12b886",
          "#40c057",
          "#82c91e",
          "#fab005",
          "#fd7e14",
        ]}
      />
    </Stack>
  );
};
