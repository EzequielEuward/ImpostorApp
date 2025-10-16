import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  Alert,
  useMediaQuery,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const VotingScreen = ({ players, onVote, onBack, timeLeft, onRestart }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTimeUp = timeLeft <= 0;

  const handleVote = () => {
    if (selectedPlayer) onVote(selectedPlayer);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Botones superiores - COMPACTOS */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mb: 1, // Reducido
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 1,
          flexShrink: 0, // Evita que crezca
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          variant="outlined"
          disabled={isTimeUp}
          size={isMobile ? "small" : "medium"} // Tamaño responsive
          sx={{
            borderColor: isTimeUp ? "divider" : "primary.main",
            color: isTimeUp ? "text.disabled" : "text.primary",
            "&:hover": !isTimeUp && {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          {isTimeUp ? "Tiempo Agotado" : "Volver"}
        </Button>

        <Button
          startIcon={<RestartAltIcon />}
          onClick={onRestart}
          variant="outlined"
          size={isMobile ? "small" : "medium"} // Tamaño responsive
          sx={{
            borderColor: "divider",
            color: "text.primary",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Reiniciar
        </Button>
      </Box>

      {isTimeUp && (
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 1, // Reducido
            fontSize: {
              xs: "0.75rem", // Más compacto
              sm: "0.875rem",
            },
            py: 0.5, // Menos padding vertical
            flexShrink: 0, // Evita que crezca
          }}
        >
          El tiempo de debate ha finalizado. Deben proceder a la votación.
        </Alert>
      )}

      {/* Encabezado - MÁS COMPACTO */}
      <Box 
        textAlign="center"
        sx={{
          mb: 1, // Reducido
          flexShrink: 0, // Evita que crezca
        }}
      >
        <Box
          sx={{
            width: {
              xs: 48, // Más pequeño
              sm: 60,
            },
            height: {
              xs: 48,
              sm: 60,
            },
            mx: "auto",
            mb: 1, // Reducido
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(232,85,255,0.3)",
          }}
        >
          <HowToVoteIcon
            sx={{
              fontSize: {
                xs: 24, // Más pequeño
                sm: 30,
              },
              color: "primary.main",
              filter: "drop-shadow(0 0 6px rgba(232,85,255,0.5))",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "text.primary",
            textShadow: "0 0 10px rgba(232,85,255,0.6)",
            fontSize: {
              xs: "1.5rem", // Más compacto
              sm: "1.75rem",
            },
            mb: 0.5, // Reducido
          }}
        >
          Votación
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "text.secondary",
            fontSize: {
              xs: "0.8rem", // Más compacto
              sm: "0.9rem",
            }
          }}
        >
          {isTimeUp
            ? "El tiempo ha terminado. Voten al impostor."
            : "¿Quién creen que es el impostor?"}
        </Typography>
      </Box>

      {/* Tarjeta principal - MEJOR MANEJO DEL ESPACIO */}
      <Card
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0, // IMPORTANTE: Permite que el contenido se reduzca
          p: {
            xs: 1.5, // Menos padding
            sm: 2,
          },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          background: "background.paper",
          boxShadow: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <CardContent 
          sx={{ 
            flex: 1, 
            p: 0, 
            "&:last-child": { pb: 0 },
            display: "flex",
            flexDirection: "column",
            minHeight: 0, // IMPORTANTE: Permite que el contenido se reduzca
          }}
        >
          {/* Lista de jugadores - CON ALTURA MÁXIMA */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 1.5,
              minHeight: 0, // IMPORTANTE: Permite scroll
              "&::-webkit-scrollbar": { 
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "action.hover",
                borderRadius: "2px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "primary.main",
                borderRadius: "2px",
                opacity: 0.5,
              },
            }}
          >
            {players.map((player) => (
              <Box
                key={player.id}
                onClick={() => !isTimeUp && setSelectedPlayer(player.id)}
                sx={{
                  px: {
                    xs: 1.5,
                    sm: 2,
                  },
                  py: {
                    xs: 1.25,
                    sm: 1.5,
                  },
                  mb: 0.75,
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 1.5,
                  textAlign: "center",
                  cursor: isTimeUp ? "default" : "pointer",
                  transition: "all 0.25s ease-in-out",
                  border:
                    selectedPlayer === player.id
                      ? "2px solid"
                      : "1px solid",
                  borderColor:
                    selectedPlayer === player.id
                      ? "primary.main"
                      : "divider",
                  background:
                    selectedPlayer === player.id
                      ? "rgba(232,85,255,0.1)"
                      : "action.hover",
                  boxShadow:
                    selectedPlayer === player.id
                      ? "0 0 16px rgba(232,85,255,0.3)"
                      : "none",
                  transform: selectedPlayer === player.id ? "scale(1.02)" : "scale(1)",
                  "&:hover": !isTimeUp && {
                    borderColor: "primary.main",
                    background: "rgba(232,85,255,0.05)",
                  },
                  opacity: isTimeUp ? 0.7 : 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: selectedPlayer === player.id ? "primary.main" : "text.primary",
                    fontWeight: selectedPlayer === player.id ? 600 : 500,
                    textShadow:
                      selectedPlayer === player.id
                        ? "0 0 8px rgba(232,85,255,0.4)"
                        : "none",
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                    }
                  }}
                >
                  {player.name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Botón de confirmación - SIEMPRE VISIBLE */}
          <Box 
            sx={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "background.paper",
              pt: 1,
              flexShrink: 0, // No se reduce
            }}
          >
            <Button
              onClick={handleVote}
              disabled={!selectedPlayer}
              fullWidth
              size={isMobile ? "medium" : "large"}
              variant="contained"
              sx={{
                height: {
                  xs: 44,
                  sm: 48
                },
                fontSize: {
                  xs: "0.85rem",
                  sm: "1rem",
                },
                fontWeight: 600,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
                "&:disabled": {
                  bgcolor: "action.disabled",
                  color: "text.disabled",
                },
              }}
            >
              Eliminar Jugador
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VotingScreen;