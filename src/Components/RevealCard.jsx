import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const RevealCard = ({ player, word, onNext, isLastPlayer }) => {
  const [isDragging, setIsDragging] = useState(false);
  const y = useMotionValue(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const topCardOpacity = useTransform(y, [-120, 0], [0.6, 1]);
  const bottomCardOpacity = useTransform(y, [-100, 0], [1, 0]);
  const topCardScale = useTransform(y, [-120, 0], [0.96, 1]);
  const bottomCardScale = useTransform(y, [-100, 0], [1, 0.95]);

  const handleDragEnd = () => {
    animate(y, 0, { type: "spring", stiffness: 300, damping: 25 });
    setIsDragging(false);
  };

  const handleDragStart = () => setIsDragging(true);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(180deg, #111122 0%, #0a0a14 100%)",
        color: "#fff",
        overflow: "hidden",
        p: 3,
      }}
    >
      {/* Turno del jugador */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: "#ff4081", fontWeight: 600, letterSpacing: 1 }}
        >
          Turno de
        </Typography>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            color: "#6678ff",
            fontWeight: 800,
            textShadow: "0 0 10px rgba(102,120,255,0.4)",
          }}
        >
          {player.name}
        </Typography>
      </Box>

      {/* Carta contenedora */}
      <Box
        sx={{
          position: "relative",
          width: isMobile ? 260 : 320,
          height: isMobile ? 360 : 420,
          perspective: 1000,
        }}
      >
        {/* Carta de rol */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            border: `1px solid ${
              player.isImpostor ? "rgba(255,75,75,0.5)" : "rgba(232,85,255,0.4)"
            }`,
            background: "linear-gradient(180deg, #1a1a2a 0%, #10101f 100%)",
            boxShadow: `0 0 25px ${
              player.isImpostor
                ? "rgba(255,75,75,0.4)"
                : "rgba(232,85,255,0.25)"
            }`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            opacity: bottomCardOpacity,
            scale: bottomCardScale,
          }}
        >
          <VisibilityIcon
            sx={{
              fontSize: 52,
              color: player.isImpostor ? "#ff4b4b" : "#e855ff",
              mb: 2,
            }}
          />
          {player.isImpostor ? (
            <>
              <Typography variant="h6" fontWeight="bold" color="error.main">
                ¡ERES EL IMPOSTOR!
              </Typography>
              <Typography variant="body2" color="#bbb" mt={1}>
                No tienes palabra. Intenta adivinar cuál es.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight="bold" color="#fff">
                Tu palabra es:
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  mt: 1,
                  color: "#e855ff",
                  textShadow: "0 0 10px rgba(232,85,255,0.6)",
                }}
              >
                {word}
              </Typography>
              <Typography variant="body2" color="#bbb" mt={1}>
                Di una palabra relacionada sin ser obvio.
              </Typography>
            </>
          )}
        </motion.div>

        {/* Carta oculta */}
        <motion.div
          drag="y"
          dragConstraints={{ top: -120, bottom: 0 }}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            y,
            opacity: topCardOpacity,
            scale: topCardScale,
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "linear-gradient(180deg, #151529 0%, #0d0d1a 100%)",
            boxShadow: isDragging
              ? "0 0 32px rgba(232,85,255,0.6)"
              : "0 8px 24px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "grab",
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          <VisibilityOffIcon sx={{ fontSize: 52, color: "#e855ff", mb: 2 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#fff", mb: 1 }}
          >
            ¿Listo para ver tu rol?
          </Typography>
          <Typography variant="body2" color="#bbb">
            Arrastra hacia arriba para revelar tu carta
          </Typography>
        </motion.div>
      </Box>

      {/* Botón siguiente */}
      <Button
        onClick={onNext}
        variant="contained"
        size="large"
        sx={{
          mt: 6,
          px: 5,
          py: 1.5,
          borderRadius: 8,
          fontWeight: 700,
          backgroundColor: "#e855ff",
          boxShadow: "0 0 25px rgba(232,85,255,0.5)",
          "&:hover": {
            backgroundColor: "#d43de6",
            boxShadow: "0 0 30px rgba(232,85,255,0.7)",
          },
        }}
        endIcon={<ArrowRightAltIcon />}
      >
        {isLastPlayer ? "Ir a Votación" : "Siguiente Jugador"}
      </Button>

      <Typography variant="body2" color="#aaa" sx={{ mt: 2 }}>
        Pasa el teléfono al siguiente jugador después de ver tu rol
      </Typography>
    </Container>
  );
};

export default RevealCard;
