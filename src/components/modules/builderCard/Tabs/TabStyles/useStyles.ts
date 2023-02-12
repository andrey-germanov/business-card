import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
    colorPickers: {
        [`@media (max-width: 1024px)`]: {
            flexDirection: 'column',
        },
    },
    colorPicker: {

        [`@media (max-width: 1024px)`]: {
            width: '100%'
        },
    }
}));
