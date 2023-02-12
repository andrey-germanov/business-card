import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
    editInput: {
        alignItems: 'end',
        flexWrap: 'wrap',
        gap: '16px',
        '>div:first-child':{
          maxWidth: "300px"
        },
        [`@media (max-width: 700px)`]: {
            flexDirection: 'column',
            alignItems: 'center',

            '>div:first-child':{
                maxWidth: "100%"
            },
        },
    }
}));
