import "@emotion/react";

export interface ThemeI {
  containerWidth: number;
  color: {
    accent: string;
    airBrand: string;
    headerColor: string;
    darkColor: string;
    baseColor: string;
    mid: string;
  };
  fonts: {
    serif: string;
    sans: string;
  };
}

// declare via @emotion to allow typechecking on props.theme
declare module "@emotion/react" {
  export interface Theme extends ThemeI {}
}

export const AirTheme: ThemeI = {
  containerWidth: 557,
  color: {
    accent: "#0ADDD7",
    airBrand: "#1B3889",
    headerColor: "#102261",
    darkColor: "#333333",
    baseColor: "#666666",
    mid: "#C4C4C4",
  },
  fonts: {
    serif: `Georgia, 'Times New Roman', Times, serif`,
    sans: `Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  },
};
