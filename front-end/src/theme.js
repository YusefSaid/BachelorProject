import { createTheme } from '@mui/material/styles';


const colors = {
  //orange
  yellow: {
    100: "#feefde",
    200: "#fddfbc",
    300: "#fdd09b",
    400: "#fcc079",
    500: "#fbb058",
    600: "#c98d46",
    700: "#976a35",
    800: "#644623",
    900: "#322312"
}, 
//Red:
red: {
    100: "#fbdfe1",
    200: "#f8c0c2",
    300: "#f4a0a4",
    400: "#f18185",
    500: "#ed6167",
    600: "#be4e52",
    700: "#8e3a3e",
    800: "#5f2729",
    900: "#2f1315"
},
//Pink:     
pink: {
    100: "#f4eaf3",
    200: "#e9d6e7",
    300: "#dfc1da",
    400: "#d4adce",
    500: "#c998c2",
    600: "#a17a9b",
    700: "#795b74",
    800: "#503d4e",
    900: "#281e27"
},  
//Gray: 
grey: {
    100: "#edeef1",
    200: "#dbdee3",
    300: "#cacdd6",
    400: "#b8bdc8",
    500: "#a6acba",
    600: "#858a95",
    700: "#646770",
    800: "#42454a",
    900: "#212225"
},  
//White:
white: {
    100: "#f7f9fb",
    200: "#f0f2f6",
    300: "#e8ecf2",
    400: "#e1e5ed",
    500: "#d9dfe9",
    600: "#aeb2ba",
    700: "#82868c",
    800: "#57595d",
    900: "#2b2d2f"
},
//Green
green: {
    100: "#ebf4ea",
    200: "#d6e9d4",
    300: "#c2ddbf",
    400: "#add2a9",
    500: "#99c794",
    600: "#7a9f76",
    700: "#5c7759",
    800: "#3d503b",
    900: "#1f281e"
}, 
//Flame:
orange: {
    100: "#fee5dd",
    200: "#fdcabc",
    300: "#fbb09a",
    400: "#fa9579",
    500: "#f97b57",
    600: "#c76246",
    700: "#954a34",
    800: "#643123",
    900: "#321911"
}, 
//Teal:
teal: {
    100: "#dff0f0",
    200: "#bfe2e1",
    300: "#a0d3d3",
    400: "#80c5c4",
    500: "#60b6b5",
    600: "#4d9291",
    700: "#3a6d6d",
    800: "#264948",
    900: "#132424"
}, 
//BG:
black: {
    100: "#d6d7d9",
    200: "#acafb3",
    300: "#83888d",
    400: "#596067",
    500: "#303841",
    600: "#262d34",
    700: "#1d2227",
    800: "#13161a",
    900: "#0a0b0d"
}, 
//Blue:  
blue: {
    100: "#e0ebf5",
    200: "#c2d6eb",
    300: "#a3c2e2",
    400: "#85add8",
    500: "#6699ce",
    600: "#527aa5",
    700: "#3d5c7c",
    800: "#293d52",
    900: "#141f29"
}}


const theme = createTheme({
  palette: {
    primary: {
      main: colors.black[500],
      light: colors.black[400]
    },
    secondary: {
      // This is green.A700 as hex.
      main: colors.yellow[500],
    },
    background: {
      defualt: colors.white[500]
    }
  },
  typography: {
    fontFamily: "Quicksand"
  }
});

export default theme