import { Center, Flex, SegmentedControl, Text } from "@mantine/core";
import { createStyles } from "@mantine/styles";

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


export const useStyles = createStyles((theme) => ({
    fontStyle: {
      [`@media (max-width: 700px)`]: {
        flexDirection: 'column',
        alignItems: 'start',
        width: '100%',
      },
    }
}));

export const EditStylesText = ({
  field,
  fontSize,
  editableStylesName,
}: IProps) => {
  const { classes } = useStyles();
  return (
    <Flex className={classes.fontStyle} gap={10} justify={'center'} align={'center'}>
        <Text fz={12}>Font size:</Text>
        <SegmentedControl
        defaultValue={fontSize}
        onChange={(e) => editableStylesName(e, field)}
        data={sizes}
        />
    </Flex>
  );
};
