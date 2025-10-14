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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        background: "transparent",
      }}
    >
      {/* Header */}
      <Box textAlign="center" sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            borderRadius: "50%",
            bgcolor: "rgba(255,75,139,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
            boxShadow: "0 0 25px rgba(255,75,139,0.4)",
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 42, color: "#fff" }} />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#fff",
            textShadow: "0 0 12px rgba(232,85,255,0.6)",
          }}
        >
          Resultado Ronda {round}
        </Typography>
      </Box>

      {/* Card principal */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 600, // <-- más ancho
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          border: "1px solid rgba(255,255,255,0.08)",
          background: "linear-gradient(180deg, #151529 0%, #0d0d1a 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          color: "#fff",
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
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Jugador Eliminado
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="error"
              sx={{ mt: 1 }}
            >
              {eliminatedPlayer.name}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

            {eliminatedPlayer.isImpostor ? (
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#ff4b8b" }}
                >
                  ¡ERA EL IMPOSTOR!
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Los civiles ganaron esta ronda
                </Typography>
              </Box>
            ) : (
              <Typography variant="subtitle1" fontWeight="bold">
                Era un civil
              </Typography>
            )}
          </Paper>
        )}

        {/* Jugadores restantes */}
        {!impostorEliminated && activePlayers.length > 2 && (
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, color: "#fff" }}
            >
              Jugadores Restantes
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1.5} justifyContent="center">
              {activePlayers.map((player) => (
                <Paper
                  key={player.id}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.06)",
                    textAlign: "center",
                    flex: { xs: "1 1 45%", sm: "1 1 30%" },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="500"
                    sx={{ color: "#fff" }}
                  >
                    {player.name}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {/* Mensaje de victoria del impostor */}
        {!impostorEliminated && activePlayers.length <= 2 && (
          <Paper
            sx={{
              textAlign: "center",
              p: 3,
              border: "1px solid rgba(211,47,47,0.3)",
              background: "rgba(211,47,47,0.15)",
              borderRadius: 3,
              color: "#fff",
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="error">
              ¡El impostor ganó!
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 1, color: "rgba(255,255,255,0.8)" }}
            >
              Era:{" "}
              <Typography component="span" fontWeight="bold" sx={{ color: "#fff" }}>
                {impostor?.name}
              </Typography>
            </Typography>
          </Paper>
        )}

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
            height: 64,
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 3,
            mt: 2,
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

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default ResultsScreen;
