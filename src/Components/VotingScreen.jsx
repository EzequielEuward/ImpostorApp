import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  Alert,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const VotingScreen = ({ players, onVote, onBack, timeLeft, onRestart }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const theme = useTheme();
  const isTimeUp = timeLeft <= 0;

  const handleVote = () => {
    if (selectedPlayer) onVote(selectedPlayer);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        height: "100vh",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(180deg, #151529 0%, #0d0d1a 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Botones superiores */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: -2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          variant="outlined"
          disabled={isTimeUp}
          sx={{
            borderColor: isTimeUp ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.25)",
            color: "#fff",
            "&:hover": !isTimeUp && {
              borderColor: "secondary.main",
              backgroundColor: "rgba(255,75,139,0.08)",
            },
          }}
        >
          {isTimeUp ? "Tiempo Agotado" : "Volver al Debate"}
        </Button>

        <Button
          startIcon={<RestartAltIcon />}
          onClick={onRestart}
          variant="outlined"
          sx={{
            borderColor: "rgba(255,255,255,0.25)",
            color: "#fff",
            "&:hover": {
              borderColor: "secondary.main",
              backgroundColor: "rgba(255,75,139,0.08)",
            },
          }}
        >
          Reiniciar Juego
        </Button>
      </Box>

      {isTimeUp && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          El tiempo de debate ha finalizado. Deben proceder a la votación.
        </Alert>
      )}

      {/* Encabezado */}
      <Box textAlign="center">
        <Box
          sx={{
            width: 72,
            height: 72,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            opacity: 0.15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 25px rgba(232,85,255,0.3)",
          }}
        >
          <HowToVoteIcon
            sx={{
              fontSize: 36,
              color: "secondary.main",
              filter: "drop-shadow(0 0 6px rgba(232,85,255,0.5))",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#fff",
            textShadow: "0 0 10px rgba(232,85,255,0.6)",
          }}
        >
          Votación
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
          {isTimeUp
            ? "El tiempo ha terminado. Voten al impostor."
            : "¿Quién creen que es el impostor?"}
        </Typography>
      </Box>

      {/* Tarjeta principal */}
      <Card
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "linear-gradient(180deg, #151529 0%, #0d0d1a 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: 1, p: 0, "&:last-child": { pb: 0 } }}>
          {/* Lista de jugadores */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "450px",
              mb: 2,
              pr: 1,
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.05)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(232,85,255,0.3)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(232,85,255,0.5)",
              },
            }}
          >
            {players.map((player) => (
              <Box
                key={player.id}
                onClick={() => !isTimeUp && setSelectedPlayer(player.id)}
                sx={{
                  px: 3,
                  py: 2,
                  mb: 1,
                  width: "90%",
                  justifyContent: "center",
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: isTimeUp ? "default" : "pointer",
                  color: "#fff",
                  transition: "all 0.25s ease-in-out",
                  border:
                    selectedPlayer === player.id
                      ? "1px solid #ff4b8b"
                      : "1px solid rgba(255,255,255,0.15)",
                  background:
                    selectedPlayer === player.id
                      ? "linear-gradient(90deg, rgba(232,85,255,0.25), rgba(255,75,139,0.2))"
                      : "rgba(255,255,255,0.05)",
                  boxShadow:
                    selectedPlayer === player.id
                      ? "0 0 16px rgba(255,75,139,0.5)"
                      : "none",
                  transform: selectedPlayer === player.id ? "scale(1.02)" : "scale(1)",
                  "&:hover": !isTimeUp && {
                    borderColor: "#ff4b8b",
                    background: "linear-gradient(90deg, rgba(232,85,255,0.15), rgba(255,75,139,0.15))",
                  },
                  opacity: isTimeUp ? 0.7 : 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: selectedPlayer === player.id ? "#ff4b8b" : "#fff",
                    fontWeight: selectedPlayer === player.id ? 600 : 500,
                    textShadow:
                      selectedPlayer === player.id
                        ? "0 0 8px rgba(255,75,139,0.6)"
                        : "0 0 4px rgba(255,255,255,0.3)",
                  }}
                >
                  {player.name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Botón de confirmación */}
          <Box mt={2}>
            <Button
              onClick={handleVote}
              disabled={!selectedPlayer}
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              sx={{
                height: 56,
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "0 0 16px rgba(255,75,139,0.4)",
                "&:hover": {
                  boxShadow: "0 0 24px rgba(255,75,139,0.6)",
                },
                "&:disabled": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                },
              }}
            >
              Eliminar Jugador
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VotingScreen;
