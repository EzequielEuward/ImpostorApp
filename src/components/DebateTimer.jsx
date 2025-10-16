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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        p: {
          xs: 2, // Menos padding en móvil
          sm: 3, // Padding normal en desktop
        },
      }}
    >
      {/* Contenido principal */}
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%", // Ocupa todo el ancho en móvil
            sm: 480,    // Ancho máximo en desktop
          },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Botón nuevo juego */}
        <Button
          startIcon={<RestartAltIcon />}
          onClick={onRestart}
          variant="outlined"
          sx={{
            alignSelf: {
              xs: "stretch", 
              sm: "flex-end", 
            },
            borderColor: "divider",
            color: "text.primary",
            borderRadius: 2,
            fontWeight: 600,
            mb: {
              xs: 1,
              sm: 0,
            },
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
        >
          Nuevo juego
        </Button>

        {/* Icono principal */}
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: {
              xs: 60,
              sm: 80,
            },
            height: {
              xs: 60,
              sm: 80,
            },
            mb: 2,
            boxShadow: "0 0 25px rgba(232,85,255,0.4)",
          }}
        >
          <AccessTimeIcon 
            sx={{ 
              fontSize: {
                xs: 28,
                sm: 38,
              }, 
              color: "white" 
            }} 
          />
        </Avatar>

        {/* Encabezado */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "primary.main",
            textShadow: "0 0 12px rgba(102,120,255,0.5)",
            fontSize: {
              xs: "1.75rem",
              sm: "2.125rem",
            },
          }}
        >
          Ronda {round}
        </Typography>
        <Typography
          variant="body1"
          sx={{ 
            color: "text.secondary", 
            mb: 3, 
            fontWeight: 500,
            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
            }
          }}
        >
          Tiempo de debate
        </Typography>

        {/* Tarjeta principal */}
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: {
              xs: 3, 
              sm: 4, 
            },
            border: "1px solid",
            borderColor: "divider",
            background: "background.paper",
            boxShadow: {
              xs: 2, 
              sm: 4, 
            },
            p: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Stack spacing={4} alignItems="center">
              {/* Tiempo */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: getColor(),
                  textShadow: `0 0 18px ${getColor()}60`,
                  transition: "all 0.4s ease",
                  fontSize: {
                    xs: "3rem", 
                    sm: "3.75rem",
                  },
                  lineHeight: 1,
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
                  color: isRunning ? "primary.main" : "error.main",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontSize: {
                    xs: "0.8rem",  
                    sm: "0.875rem", 
                  }
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
                    height: {
                      xs: 8, 
                      sm: 12,
                    },
                    borderRadius: 6,
                    backgroundColor: "action.hover",
                    "& .MuiLinearProgress-bar": {
                      background: `linear-gradient(90deg, ${getColor()}, ${timeLeft <= 60 ? "#ff4b8b" : "#6678ff"})`,
                      transition: "width 1s linear",
                    },
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: timeLeft > 0 ? "text.secondary" : "error.main",
                  fontWeight: 500,
                  fontSize: {
                    xs: "0.8rem", 
                    sm: "0.875rem", 
                  }
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
                  height: {
                    xs: 48,
                    sm: 56 
                  },
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem", // Tamaño normal en desktop
                  },
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                Ir a Votación
              </Button>

              {/* Controles secundarios */}
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ 
                  width: "100%",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  }
                }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={handlePauseResume}
                  startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                  sx={{
                    borderColor: isRunning ? "primary.main" : "success.main",
                    color: isRunning ? "primary.main" : "success.main",
                    fontWeight: 600,
                    borderWidth: 2,
                    "&:hover": {
                      borderColor: "secondary.main",
                      color: "secondary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {isRunning ? "Pausar" : "Reanudar"}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={handleReset}
                  startIcon={<ReplayIcon />}
                  sx={{
                    borderColor: "divider",
                    color: "text.primary",
                    fontWeight: 600,
                    borderWidth: 2,
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  Reiniciar
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DebateTimer;