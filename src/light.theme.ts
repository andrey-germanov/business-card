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
          flexDirection: 'column',
          justifyContent: 'center',
          whiteSpace: 'normal'
        } as CSSObject;
        return {
          label,
        }
      }
    }
  }
} as MantineThemeOverride;
