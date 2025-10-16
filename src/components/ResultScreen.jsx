import {
  Box,
  Typography,
  Card,
  Button,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const ResultsScreen = ({ players, onNextRound, onRestart, round }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const eliminatedPlayer = players.find(
    (p) =>
      p.isEliminated &&
      !players
        .filter((pl) => pl.isEliminated)
        .slice(0, -1)
        .includes(p)
  );

  const activePlayers = players.filter((p) => !p.isEliminated);
  const activeImpostors = players.filter((p) => p.isImpostor && !p.isEliminated);
  const allImpostorsEliminated = activeImpostors.length === 0;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
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
            sm: 600,    // Ancho máximo en desktop
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Header */}
        <Box textAlign="center">
          <Box
            sx={{
              width: {
                xs: 60, // Más pequeño en móvil
                sm: 80, // Tamaño normal en desktop
              },
              height: {
                xs: 60,
                sm: 80,
              },
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
            <EmojiEventsIcon 
              sx={{ 
                fontSize: {
                  xs: 32, // Icono más pequeño en móvil
                  sm: 42, // Tamaño normal en desktop
                }, 
                color: "white" 
              }} 
            />
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "text.primary",
              textShadow: "0 0 12px rgba(232,85,255,0.6)",
              fontSize: {
                xs: "1.75rem", // Título más pequeño en móvil
                sm: "2.125rem", // Tamaño normal en desktop
              },
            }}
          >
            Resultado Ronda {round}
          </Typography>
        </Box>

        {/* Card principal */}
        <Card
          sx={{
            width: "100%",
            borderRadius: {
              xs: 3, // Bordes menos redondeados en móvil
              sm: 4, // Bordes más redondeados en desktop
            },
            p: {
              xs: 2, // Menos padding en móvil
              sm: 3, // Padding intermedio
              md: 4, // Padding generoso en desktop grande
            },
            border: "1px solid",
            borderColor: "divider",
            background: "background.paper",
            boxShadow: {
              xs: 2, // Sombra más suave en móvil
              sm: 4, // Sombra normal en desktop
            },
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
                p: {
                  xs: 2, // Menos padding en móvil
                  sm: 3, // Padding normal en desktop
                },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                background: "action.hover",
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "1rem", // Texto más pequeño en móvil
                    sm: "1.25rem", // Tamaño normal en desktop
                  }
                }}
              >
                Jugador Eliminado
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="error"
                sx={{ 
                  mt: 1,
                  fontSize: {
                    xs: "2rem", // Tamaño más pequeño en móvil
                    sm: "2.5rem", // Tamaño normal en desktop
                  }
                }}
              >
                {eliminatedPlayer.name}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {eliminatedPlayer.isImpostor ? (
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="secondary"
                    sx={{
                      fontSize: {
                        xs: "1.25rem", // Texto más pequeño en móvil
                        sm: "1.5rem", // Tamaño normal en desktop
                      }
                    }}
                  >
                    ¡ERA UN IMPOSTOR!
                  </Typography>
                  <Typography 
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.8rem", // Texto más pequeño en móvil
                        sm: "0.875rem", // Tamaño normal en desktop
                      }
                    }}
                  >
                    Los civiles ganaron esta ronda
                  </Typography>
                </Box>
              ) : (
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Era un civil
                </Typography>
              )}
            </Paper>
          )}

          {/* Jugadores restantes */}
          {!allImpostorsEliminated && activePlayers.length > 2 && (
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ 
                  mb: 2,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.25rem",
                  }
                }}
              >
                Jugadores Restantes
              </Typography>
              <Box 
                display="flex" 
                flexWrap="wrap" 
                gap={1.5} 
                justifyContent="center"
                sx={{
                  flexDirection: {
                    xs: "column", // Columna en móvil para mejor uso del espacio
                    sm: "row",    // Fila en desktop
                  }
                }}
              >
                {activePlayers.map((player) => (
                  <Paper
                    key={player.id}
                    sx={{
                      px: {
                        xs: 2, // Menos padding horizontal en móvil
                        sm: 3, // Padding normal en desktop
                      },
                      py: {
                        xs: 1, // Menos padding vertical en móvil
                        sm: 1.5, // Padding normal en desktop
                      },
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      background: "action.hover",
                      textAlign: "center",
                      flex: {
                        xs: "none", // Sin flex en móvil (columna)
                        sm: "1 1 30%", // Flex en desktop
                      },
                      width: {
                        xs: "100%", // Ancho completo en móvil
                        sm: "auto", // Ancho automático en desktop
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      sx={{
                        fontSize: {
                          xs: "0.9rem", // Texto más pequeño en móvil
                          sm: "1rem", // Tamaño normal en desktop
                        }
                      }}
                    >
                      {player.name}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}

          {/* Victoria de los impostores */}
          {!allImpostorsEliminated && activePlayers.length <= activeImpostors.length + 1 && (
            <Paper
              sx={{
                textAlign: "center",
                p: {
                  xs: 2,
                  sm: 3,
                },
                border: "2px solid",
                borderColor: "error.main",
                background: "rgba(211,47,47,0.1)",
                borderRadius: 3,
              }}
            >
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color="error"
                sx={{
                  fontSize: {
                    xs: "1.25rem",
                    sm: "1.5rem",
                  }
                }}
              >
                ¡Los impostores ganaron!
              </Typography>
              <Typography
                variant="h6"
                sx={{ 
                  mt: 1, 
                  color: "text.secondary",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                  }
                }}
              >
                Eran:{" "}
                {players
                  .filter((p) => p.isImpostor)
                  .map((p) => p.name)
                  .join(", ")}
              </Typography>
            </Paper>
          )}

          {/* Botón final */}
          <Button
            onClick={
              allImpostorsEliminated || activePlayers.length <= activeImpostors.length + 1
                ? onRestart
                : onNextRound
            }
            variant="contained"
            size="large"
            endIcon={
              allImpostorsEliminated || activePlayers.length <= activeImpostors.length + 1 ? (
                <ReplayIcon />
              ) : (
                <ArrowForwardIcon />
              )
            }
            sx={{
              height: {
                xs: 56, // Altura menor en móvil
                sm: 64  // Altura normal en desktop
              },
              fontSize: {
                xs: "1rem", // Texto más pequeño en móvil
                sm: "1.1rem", // Tamaño normal en desktop
              },
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 3,
              mt: 2,
              boxShadow: 3,
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            {allImpostorsEliminated || activePlayers.length <= activeImpostors.length + 1
              ? "Nueva Partida"
              : "Siguiente Ronda"}
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default ResultsScreen;