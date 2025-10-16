import { Box } from "@mui/material";

export const GameLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: "100dvh", // Usa dynamic viewport height en móvil
          md: "100vh", // Viewport height normal en desktop
        },
        minHeight: {
          xs: "100dvh",
          md: "100vh",
        },
        maxWidth: {
          xs: "100%", // En móvil ocupa todo el ancho
          sm: 500, // Tablets pequeñas
          md: 700, // Tablets grandes/desktop pequeño
          lg: 900, // Desktop medio
          xl: 1100, // Desktop grande
        },
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "background.default",
        
        // Mejoras para móvil
        "@media (max-width: 600px)": {
          borderRadius: 0, // Sin bordes redondeados en móvil
          "&::after": {
            content: '""',
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "env(safe-area-inset-top)",
            backgroundColor: "background.default",
            zIndex: 9999,
          },
          "&::before": {
            content: '""',
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "env(safe-area-inset-bottom)",
            backgroundColor: "background.default",
            zIndex: 9999,
          },
        },
        
        // Estilos para desktop/tablet
        "@media (min-width: 600px)": {
          borderRadius: 2,
          boxShadow: 3,
          my: 2,
          height: {
            xs: "calc(100dvh - 16px)", // Resta el margen vertical
            md: "calc(100vh - 16px)",
          },
          minHeight: {
            xs: "calc(100dvh - 16px)",
            md: "calc(100vh - 16px)",
          },
        },
      }}
    >
      {/* Contenedor principal del contenido */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "auto",
          padding: {
            xs: 2, // Padding más pequeño en móvil
            sm: 3, // Padding medio en tablets
            md: 4, // Padding generoso en desktop
          },
          // Manejo seguro de áreas en móviles modernos
          paddingTop: {
            xs: "calc(16px + env(safe-area-inset-top, 0px))",
            sm: 3,
          },
          paddingBottom: {
            xs: "calc(16px + env(safe-area-inset-bottom, 0px))",
            sm: 3,
          },
          // Scroll suave
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "primary.main",
            borderRadius: "4px",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GameLayout;