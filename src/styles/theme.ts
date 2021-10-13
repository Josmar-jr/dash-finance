import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    blue: {
      "300": "#70A3FF",
      "400": "#538BF0",
      "500": "#366ED1",
    },
    gray: {
      "300": "#8A8A8A",
      "400": "#676767",
      "500": "#434343",
      "700": "#202020",
      "800": "#202024",
      "900": "#121214",
    },
    white: {
      "300": "#F8FAF7",
      "400": "#FAF8F5",
      "500": "#ccccd1",
    },
    red: {
      "200": "#F05454",
      "300": "#EB3D3D",
      "400": "#D03333",
    },
    green: {
      "200": "#50E170",
      "300": "#32D957",
      "400": "#28BB49",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.300",
      },
    },
  },
});
