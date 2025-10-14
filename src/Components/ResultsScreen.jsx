import React from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const ResultsScreen = ({ players, onNextRound, onRestart, round }) => {
  const theme = useTheme();

  const eliminatedPlayer = players.find(
    (p) =>
      p.isEliminated &&
      !players
        .filter((pl) => pl.isEliminated)
        .slice(0, -1)
        .includes(p)
  );

  const activePlayers = players.filter((p) => !p.isEliminated);
  const impostor = players.find((p) => p.isImpostor);
  const impostorEliminated = impostor?.isEliminated;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box textAlign="center" sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 70,
            height: 70,
            mx: "auto",
            borderRadius: "50%",
            bgcolor: "rgba(255,75,139,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
            boxShadow: "0 0 25px rgba(255,75,139,0.3)",
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 38, color: "#fff" }} />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textShadow: "0 0 10px rgba(232,85,255,0.5)",
          }}
        >
          Resultado Ronda {round}
        </Typography>
      </Box>

      {/* Card principal */}
      <Card
        sx={{
          p: 3,
          width: "95%",
          maxWidth: 420,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "linear-gradient(180deg, #141428 0%, #0e0e1c 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Jugador Eliminado */}
        {eliminatedPlayer && (
          <Paper
            sx={{
              textAlign: "center",
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Jugador Eliminado
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mt: 1, color: "#ff3b3b" }}
            >
              {eliminatedPlayer.name}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

            {eliminatedPlayer.isImpostor ? (
              <Box>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  ¡ERA EL IMPOSTOR!
                </Typography>
                <Typography sx={{ opacity: 0.8 }}>
                  Los civiles ganaron esta ronda
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ opacity: 0.9 }}>Era un civil</Typography>
            )}
          </Paper>
        )}

        {/* Jugadores restantes */}
        {!impostorEliminated && activePlayers.length > 2 && (
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 1, color: "#fff" }}
            >
              Jugadores Restantes
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {activePlayers.map((player) => (
                <Paper
                  key={player.id}
                  sx={{
                    textAlign: "center",
                    p: 1.5,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Typography variant="h6" fontWeight="500">
                    {player.name}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {/* Victoria impostor */}
        {!impostorEliminated && activePlayers.length <= 2 && (
          <Paper
            sx={{
              textAlign: "center",
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(255,75,139,0.3)",
              background: "rgba(255,75,139,0.1)",
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="error">
              ¡El impostor ganó!
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Era:{" "}
              <Typography component="span" fontWeight="bold">
                {impostor?.name}
              </Typography>
            </Typography>
          </Paper>
        )}

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Botón final */}
        <Button
          onClick={
            impostorEliminated || activePlayers.length <= 2
              ? onRestart
              : onNextRound
          }
          variant="contained"
          color="secondary"
          size="large"
          endIcon={
            impostorEliminated || activePlayers.length <= 2 ? (
              <ReplayIcon />
            ) : (
              <ArrowForwardIcon />
            )
          }
          sx={{
            height: 56,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 3,
            mt: 1,
            boxShadow: "0 0 20px rgba(255,75,139,0.4)",
            "&:hover": {
              boxShadow: "0 0 30px rgba(255,75,139,0.6)",
            },
          }}
        >
          {impostorEliminated || activePlayers.length <= 2
            ? "Nueva Partida"
            : "Siguiente Ronda"}
        </Button>
      </Card>
    </Box>
  );
};

export default ResultsScreen;
