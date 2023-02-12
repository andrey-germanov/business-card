import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
    blocks: {
        gap: "50px",
        [`@media (max-width: 1024px)`]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: "50px",
        },
        [`@media (max-width: 700px)`]: {
            gap: "20px",
        },
    },
    actionsBlock: {
        width: '100%',
        maxWidth: '1024px',
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 15px",
        borderRadius: "30px",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        position: "relative",

        [`@media (max-width: 1024px)`]: {
            gap: "36px",
            padding: "36px",
        },
        [`@media (max-width: 700px)`]: {
            gap: "20px",
            padding: "20px",
        },
    }
}));
