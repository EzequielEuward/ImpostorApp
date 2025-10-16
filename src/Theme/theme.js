import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#222",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#140a0aff", // fondo general más oscuro
      paper: "#111122", // fondo de las cards
    },
    primary: {
      main: "#e855ff", // violeta/rosado principal (para botones activos)
    },
    secondary: {
      main: "#ff4b8b", // acento rosado
    },
    text: {
      primary: "#ffffff",
      secondary: "#b8b4c7", // gris suave para textos secundarios
    },
    divider: "rgba(255,255,255,0.1)", // líneas sutiles
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h6: {
      color: "#f5f1ff",
      fontWeight: 600,
    },
    body2: {
      color: "#b8b4c7",
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 500,
        },
        contained: {
          backgroundColor: "#ff4b8b",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#ff6da6",
          },
          "&:disabled": {
            backgroundColor: "rgba(255, 75, 139, 0.3)",
            color: "#ffffffff",
          },
        },
        outlined: {
          borderColor: "rgba(255,255,255,0.15)",
          color: "#fff",
          "&:hover": {
            borderColor: "#e855ff",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, #151529 0%, #0d0d1a 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        },
      },
    },
  },
});
