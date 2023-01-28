import { CSSObject, MantineTheme, MantineThemeOverride } from "@mantine/core";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  colorScheme: "light",

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: 30 },
    },
  },
  components: {
    Button: {
      styles: (theme: MantineTheme) => {
        const label = {
          flexDirection: "column",
          justifyContent: "center",
          whiteSpace: "normal",
          gap: "3px",
        } as CSSObject;
        return {
          label,
        };
      },
    },
    Tabs: {
      styles: (theme: MantineTheme) => {
        const tab = {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[4]
          }`,
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          cursor: "pointer",
          fontSize: theme.fontSizes.sm,
          display: "flex",
          alignItems: "center",

          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&:first-of-type": {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          "&:last-of-type": {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          "&[data-active]": {
            backgroundColor: theme.colors.blue[7],
            borderColor: theme.colors.blue[7],
            color: theme.white,
          },
        } as CSSObject;

        const tabIcon = {
          marginRight: theme.spacing.xs,
          display: "flex",
          alignItems: "center",
        } as CSSObject;

        const tabsList = {
          display: "flex",
        } as CSSObject;

        const root = {
          display: "flex",
          flexDirection: 'column',
          gap: '20px'
        } as CSSObject;
        return {
          tab,
          tabIcon,
          tabsList,
          root,
        };
      },
    },
  },
} as MantineThemeOverride;
