import { Center, Flex, SegmentedControl, Text } from "@mantine/core";

const sizes = [
  {
    value: "12px",
    label: <Center>xs</Center>,
  },
  {
    value: "16px",
    label: <Center>sm</Center>,
  },
  {
    value: "20px",
    label: <Center>md</Center>,
  },
  {
    value: "24px",
    label: <Center>lg</Center>,
  },
  {
    value: "30px",
    label: <Center>xl</Center>,
  },
];
type IProps = {
  field: string;
  fontSize: string;
  editableStylesName: (size: string, field: string) => void;
};
export const EditStylesText = ({
  field,
  fontSize,
  editableStylesName,
}: IProps) => {
  return (
    <Flex gap={10} justify={'center'} align={'center'}>
        <Text fz={12}>Font size:</Text>
        <SegmentedControl
        defaultValue={fontSize}
        onChange={(e) => editableStylesName(e, field)}
        data={sizes}
        />
    </Flex>
  );
};
