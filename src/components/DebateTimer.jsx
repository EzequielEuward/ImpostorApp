import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  LinearProgress,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const DebateTimer = ({
  debateMinutes,
  round,
  onTimeUp,
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
  onRestart,
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (debateMinutes * 60)) * 100;

  const getColor = () => {
    if (timeLeft <= 30) return "#ff4b4b";
    if (timeLeft <= 60) return "#e855ff";
    return "#6678ff";
  };

  const handlePauseResume = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setTimeLeft(debateMinutes * 60);
    setIsRunning(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        mx: "auto",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #111122 0%, #0a0a14 100%)",
        color: "#fff",
        p: 3,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Botón nuevo juego */}
      <Button
        startIcon={<RestartAltIcon />}
        onClick={onRestart}
        variant="outlined"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          borderColor: "rgba(255,255,255,0.2)",
          color: "#fff",
          borderRadius: 2,
          fontWeight: 600,
          "&:hover": {
            borderColor: "#e855ff",
            backgroundColor: "rgba(232,85,255,0.05)",
          },
        }}
      >
        Nuevo juego
      </Button>

      {/* Icono principal */}
      <Avatar
        sx={{
          bgcolor: "#e855ff",
          width: 80,
          height: 80,
          mb: 2,
          boxShadow: "0 0 25px rgba(232,85,255,0.4)",
        }}
      >
        <AccessTimeIcon sx={{ fontSize: 38, color: "#fff" }} />
      </Avatar>

      {/* Encabezado */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#6678ff",
          textShadow: "0 0 12px rgba(102,120,255,0.5)",
        }}
      >
        Ronda {round}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#b8b4c7", mb: 3, fontWeight: 500 }}
      >
        Tiempo de debate
      </Typography>

      {/* Tarjeta principal */}
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "linear-gradient(180deg, #1a1a2a 0%, #10101f 100%)",
          boxShadow: "0 0 40px rgba(0,0,0,0.6)",
          p: 3,
        }}
      >
        <CardContent>
          <Stack spacing={4} alignItems="center">
            {/* Tiempo */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: getColor(),
                textShadow: `0 0 18px ${getColor()}60`,
                transition: "all 0.4s ease",
              }}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </Typography>

            {/* Estado */}
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{
                color: isRunning ? "#e855ff" : "#ff4b8b",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {isRunning ? "⏱️ En progreso" : "⏸️ En pausa"}
            </Typography>

            {/* Progreso */}
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  "& .MuiLinearProgress-bar": {
                    background:
                      "linear-gradient(90deg, #e855ff, #ff4b8b, #6678ff)",
                    transition: "width 1s linear",
                  },
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: timeLeft > 0 ? "#b8b4c7" : "#ff4b4b",
                fontWeight: 500,
              }}
            >
              {timeLeft > 0
                ? "Discutan y encuentren al impostor"
                : "¡Tiempo terminado!"}
            </Typography>

            {/* Botón principal */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={onTimeUp}
              startIcon={<HowToVoteIcon />}
              sx={{
                fontWeight: 700,
                height: 56,
                fontSize: "1rem",
                borderRadius: 2,
                background: "linear-gradient(90deg, #e855ff, #ff4b8b)",
                boxShadow: "0 0 20px rgba(255,75,139,0.4)",
                "&:hover": {
                  boxShadow: "0 0 30px rgba(255,75,139,0.6)",
                  background: "linear-gradient(90deg, #ff4b8b, #e855ff)",
                },
              }}
            >
              Ir a Votación
            </Button>

            {/* Controles secundarios */}
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handlePauseResume}
                sx={{
                  borderColor: isRunning ? "#e855ff" : "#6678ff",
                  color: isRunning ? "#e855ff" : "#6678ff",
                  fontWeight: 600,
                  borderWidth: 2,
                  "&:hover": {
                    borderColor: "#ff4b8b",
                    color: "#ff4b8b",
                    backgroundColor: "rgba(255,75,139,0.05)",
                  },
                }}
              >
                {isRunning ? "⏸️ Pausar" : "▶️ Reanudar"}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleReset}
                sx={{
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "#fff",
                  fontWeight: 600,
                  borderWidth: 2,
                  "&:hover": {
                    borderColor: "#e855ff",
                    color: "#e855ff",
                    backgroundColor: "rgba(232,85,255,0.05)",
                  },
                }}
              >
                🔄 Reiniciar
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Animación suave */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default DebateTimer;
