import { ColorPicker, Stack, Text } from "@mantine/core";
import { setStyles } from "../../store/slices/cardSlices";
import { useDispatch } from "react-redux";
import { ICardResponse } from "../../types/types";

interface IProps {
  card: ICardResponse;
}

export const BuilderColor = ({ card }: IProps) => {
  const dispatch = useDispatch();

  const handleChangeBackgroundColor = (e: string) => {
    const data = { backgroundColor: e };

    dispatch(setStyles(data));
  };
  return (
    <Stack style={{ alignSelf: "start" }}>
      <Text>Background color</Text>
      <ColorPicker
        format="hex"
        defaultValue={card.style.backgroundColor}
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
      />
    </Stack>
  );
};
