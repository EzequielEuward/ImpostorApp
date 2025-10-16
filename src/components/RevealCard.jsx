import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

export const RevealCard = ({ player, word, onNext, isLastPlayer }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [autoHideTimeout, setAutoHideTimeout] = useState(null);
  const y = useMotionValue(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Transformaciones para la animación
  const topCardOpacity = useTransform(y, [-200, 0], [0, 1]);
  const bottomCardOpacity = useTransform(y, [-150, 0], [1, 0]);
  const topCardScale = useTransform(y, [-200, 0], [0.9, 1]);
  const bottomCardScale = useTransform(y, [-150, 0], [1, 0.85]);

  // Colores sólidos como en la imagen
  const impostorColor = '#d32f2f'; // Rojo sólido
  const innocentColor = '#2e7d32'; // Verde sólido
  const primaryColor = theme.palette.primary.main;

  // Limpiar timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (autoHideTimeout) {
        clearTimeout(autoHideTimeout);
      }
    };
  }, [autoHideTimeout]);

  const handleDragEnd = (event, info) => {
    const velocity = info.velocity.y;
    const draggedDistance = y.get();

    // Si se arrastró lo suficiente O tiene suficiente velocidad hacia arriba
    if (draggedDistance < -120 || velocity < -500) {
      animate(y, -200, {
        type: "spring",
        stiffness: 150,
        damping: 15,
        restDelta: 1
      });
      setIsRevealed(true);
      
      // Programar para que baje automáticamente después de 3 segundos
      const timeout = setTimeout(() => {
        animate(y, 0, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          restDelta: 0.5
        });
        setIsRevealed(false);
      }, 3000);
      
      setAutoHideTimeout(timeout);
    } else {
      // Si no, volver a la posición inicial con animación suave
      animate(y, 0, {
        type: "spring",
        stiffness: 300,
        damping: 25,
        restDelta: 0.5
      });
    }
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    // Limpiar timeout si existe uno previo
    if (autoHideTimeout) {
      clearTimeout(autoHideTimeout);
      setAutoHideTimeout(null);
    }
  };

  const handleCardClick = () => {
    if (!isRevealed) {
      animate(y, -200, {
        type: "spring",
        stiffness: 150,
        damping: 15
      });
      setIsRevealed(true);
      
      // Programar para que baje automáticamente después de 3 segundos
      const timeout = setTimeout(() => {
        animate(y, 0, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          restDelta: 0.5
        });
        setIsRevealed(false);
      }, 3000);
      
      setAutoHideTimeout(timeout);
    }
  };

  // Función para forzar bajar la carta manualmente
  const forceHideCard = () => {
    if (autoHideTimeout) {
      clearTimeout(autoHideTimeout);
      setAutoHideTimeout(null);
    }
    animate(y, 0, {
      type: "spring",
      stiffness: 200,
      damping: 20,
      restDelta: 0.5
    });
    setIsRevealed(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        p: 3,
        background: theme.palette.background.default,
      }}
    >
      {/* Contenido principal centrado */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Turno del jugador */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "white",
              fontWeight: 500,
              letterSpacing: 1,
              fontSize: "1rem",
              mb: 0.5,
              opacity: 0.9,
            }}
          >
            Turno de
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "black",
              fontWeight: 700,
              fontSize: "2.5rem",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {player.name}
          </Typography>
        </Box>

        {/* Carta contenedora */}
        <Box
          sx={{
            position: "relative",
            width: 300,
            height: 400,
            perspective: 1000,
            cursor: !isRevealed ? "pointer" : "default",
          }}
          onClick={handleCardClick}
        >
          {/* Carta de rol (REVELADA) - COLORES SÓLIDOS */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              border: `3px solid ${player.isImpostor ? impostorColor : innocentColor}`,
              background: player.isImpostor ? impostorColor : innocentColor,
              boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              opacity: bottomCardOpacity,
              scale: bottomCardScale,
            }}
          >
            {/* Icono de rol */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              {player.isImpostor ? (
                <SecurityIcon sx={{ fontSize: 36, color: "white" }} />
              ) : (
                <EmojiPeopleIcon sx={{ fontSize: 36, color: "white" }} />
              )}
            </Box>

            {player.isImpostor ? (
              <>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                    mb: 2,
                  }}
                >
                  ¡ERES EL IMPOSTOR!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.9rem",
                    maxWidth: "80%",
                  }}
                >
                  No tienes palabra. Observa y adivina.
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "1rem",
                    mb: 2,
                  }}
                >
                  Tu palabra es:
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: "white",
                    fontSize: "2.5rem",
                    mb: 3,
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {word}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.9rem",
                    maxWidth: "80%",
                  }}
                >
                  Di una palabra relacionada sin revelar directamente.
                </Typography>
              </>
            )}
          </motion.div>

          {/* Carta oculta - BLANCA COMO EN LA IMAGEN */}
          <motion.div
            drag="y"
            dragConstraints={{ top: -200, bottom: 0 }}
            dragElastic={0.05}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              y,
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              border: "2px solid #e0e0e0",
              background: '#ffffff',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              cursor: isRevealed ? "default" : "grab",
              opacity: topCardOpacity,
              scale: topCardScale,
            }}
            whileTap={{
              cursor: isRevealed ? "default" : "grabbing",
              scale: 0.98
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Contenido de la carta superior */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${primaryColor}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 4px 20px ${primaryColor}80`,
                }}
              >
                <VisibilityOffIcon sx={{ fontSize: 36, color: "white" }} />
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 1,
                    fontSize: "1.5rem",
                  }}
                >
                  ¿Listo para ver tu rol?
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  Arrastra hacia arriba para revelar
                </Typography>
              </Box>

              {/* Indicador visual de arrastre */}
              <motion.div
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  background: primaryColor,
                  opacity: useTransform(y, [-200, 0], [0, 0.8]),
                }}
                animate={{
                  scaleX: isDragging ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isDragging ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            </Box>
          </motion.div>
        </Box>

        {/* Botón siguiente */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Button
            onClick={() => {
              forceHideCard();
              onNext();
            }}
            variant="contained"
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "1rem",
              background: `linear-gradient(135deg, ${primaryColor}, ${theme.palette.secondary.main})`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              "&:hover": {
                boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
            endIcon={<ArrowRightAltIcon />}
          >
            {isLastPlayer ? "Ir a Votación" : "Siguiente Jugador"}
          </Button>

          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontSize: "0.875rem",
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            {isRevealed
              ? "La carta se ocultará automáticamente"
              : "Pasa el dispositivo al siguiente jugador"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RevealCard;