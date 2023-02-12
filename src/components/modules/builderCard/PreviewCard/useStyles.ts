import { createStyles } from "@mantine/styles";

export interface MyComponentStylesParams {
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const useStyles = createStyles(
  (
    theme,
    { backgroundImage, backgroundColor, textColor }: MyComponentStylesParams
  ) => ({
    wrapperPreviewCard: {
      height: 700,
      minWidth: 300,
      maxWidth: 425,
      width: '100%',
      background: "black",
      borderRadius: "30px",
      padding: "15px",
      position: "relative",
    },
    previewCard: {
      height: "100%",
      width: "100%",
      borderRadius: "20px",
      padding: "0 20px",
      margin: 0,
      overflow: "auto",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url('${backgroundImage}')`,
      backgroundColor: backgroundColor,
    },
    bands: {
      width: "150px",
      height: "25px",
      backgroundColor: "black",
      borderBottomLeftRadius: "15px",
      borderBottomRightRadius: "15px",
      zIndex: 1,
    },
    contentPreviewCard: {
      width: "100%",
      background: backgroundColor ? "white" : "",
      padding: "18px",
      marginTop: "20px",
      borderRadius: "20px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      zIndex: 2,
      color: textColor,
    },
    avatar: {
      width: "150px",
      height: "150px",
      objectFit: "cover",
      borderRadius: "50%",
    },
  })
);
