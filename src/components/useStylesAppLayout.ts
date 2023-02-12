import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
    header: {
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 0,
    },
    children: {
        padding: "20px",
        width: "100%",
    }
}));
