import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import GroupIcon from "@mui/icons-material/Group";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { WORD_CATEGORIES } from "../lib/word-category";
import { saveGameSettings, loadGameSettings } from "../lib/storage";
import { PlayersModal } from "./PlayersModal";
import { CategoryModal } from "../components/CategoryModal";

export const GameConfig = ({ onBack, onContinue }) => {
  const [selectedMode, setSelectedMode] = useState("classic");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [impostorCount, setImpostorCount] = useState(1);
  const [debateMinutes, setDebateMinutes] = useState(2);
  const [players, setPlayers] = useState([]);
  const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const saved = loadGameSettings();
    if (saved) {
      setSelectedMode(saved.gameMode || "classic");
      setSelectedCategory(saved.selectedCategory || "");
      setImpostorCount(saved.impostorCount || 1);
      setDebateMinutes(saved.debateMinutes || 2);
      setPlayers(saved.players || []);
    }
  }, []);

  useEffect(() => {
    if (players.length > 0 || selectedCategory) {
      saveGameSettings({
        players,
        selectedCategory,
        impostorCount,
        debateMinutes,
        gameMode: selectedMode,
      });
    }
  }, [players, selectedCategory, impostorCount, debateMinutes, selectedMode]);

  const maxImpostors = Math.max(1, Math.floor(players.length / 1) - 1);
  const minPlayers = impostorCount + 2;
  const categoryName = WORD_CATEGORIES.find((c) => c.id === selectedCategory)?.name;

  const handleContinue = () => {
    if (selectedCategory && players.length >= minPlayers) {
      onContinue(selectedMode, selectedCategory, impostorCount, players, debateMinutes);
    }
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
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
      {/* Botón volver - posición fija para móvil */}
      <Box 
        sx={{ 
          position: {
            xs: "sticky", // Sticky en móvil para mejor UX
            sm: "static", // Normal en desktop
          },
          top: 0,
          zIndex: 10,
          backgroundColor: "background.default",
          py: {
            xs: 1, // Menos padding en móvil
            sm: 0, // Sin padding extra en desktop
          },
          mb: {
            xs: 2, // Margen inferior en móvil
            sm: 3, // Margen normal en desktop
          }
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            textTransform: "none",
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            px: 2,
            "&:hover": {
              color: "primary.main",
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
        >
          Volver
        </Button>
      </Box>

      {/* Contenido principal con scroll */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Tarjeta principal */}
        <Card
          variant="outlined"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: {
              xs: 2, // Menos padding en móvil
              sm: 3, // Padding normal en desktop
            },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            background: "background.paper",
            boxShadow: {
              xs: 1, // Sombra más suave en móvil
              sm: 3, // Sombra normal en desktop
            },
            minHeight: {
              xs: "auto", // Altura automática en móvil
              sm: 400, // Altura mínima en desktop
            },
          }}
        >
          {/* Contenido desplazable */}
          <Box 
            sx={{ 
              flex: 1,
              overflow: "auto",
              pr: {
                xs: 0, // Sin padding derecho en móvil
                sm: 1, // Pequeño padding en desktop
              },
              mb: 3,
            }}
          >
            {/* --- Modo de juego --- */}
            <Box mb={3}>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                color="text.primary" 
                mb={1}
                sx={{
                  fontSize: {
                    xs: "1.1rem", // Tamaño ligeramente más pequeño en móvil
                    sm: "1.25rem", // Tamaño normal en desktop
                  }
                }}
              >
                Modo de Juego
              </Typography>
              <Box 
                sx={{ 
                  display: "flex", 
                  gap: 2,
                  flexDirection: {
                    xs: "column", // Columna en móvil
                    sm: "row",    // Fila en desktop
                  }
                }}
              >
                {[
                  { id: "classic", label: "Clásico", desc: "Tradicional" },
                  { id: "mystery", label: "Misterio", desc: "Más desafiante" },
                ].map((mode) => (
                  <Button
                    key={mode.id}
                    fullWidth
                    variant={selectedMode === mode.id ? "contained" : "outlined"}
                    onClick={() => setSelectedMode(mode.id)}
                    sx={{
                      flex: 1,
                      py: {
                        xs: 1.5, // Menos padding vertical en móvil
                        sm: 2,   // Padding normal en desktop
                      },
                      flexDirection: "column",
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor:
                        selectedMode === mode.id
                          ? "primary.main"
                          : "divider",
                      boxShadow:
                        selectedMode === mode.id
                          ? "0 0 15px rgba(232,85,255,0.4)"
                          : "none",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: "0 0 15px rgba(232,85,255,0.3)",
                      },
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: {
                          xs: 14, 
                          sm: 16
                        },
                        color: selectedMode === mode.id ? "white" : "text.primary",
                      }}
                    >
                      {mode.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: selectedMode === mode.id ? "white" : "text.secondary",
                        fontSize: {
                          xs: 12,
                          sm: 14
                        }
                      }}
                    >
                      {mode.desc}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </Box>

            {/* --- Jugadores --- */}
            <Box mb={3}>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                color="text.primary"
                sx={{
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.25rem",
                  }
                }}
              >
                Jugadores
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 1,
                  height: {
                    xs: 48, // Altura menor en móvil
                    sm: 56  // Altura normal en desktop
                  },
                  borderRadius: 2,
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "action.hover",
                  },
                }}
                onClick={() => setIsPlayersModalOpen(true)}
                startIcon={<GroupIcon sx={{ color: "primary.main" }} />}
              >
                {players.length > 0
                  ? `${players.length} Jugador${players.length > 1 ? "es" : ""}`
                  : "Agregar Jugadores"}
              </Button>
            </Box>

            {/* --- Categoría --- */}
            <Box mb={3}>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                color="text.primary"
                sx={{
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.25rem",
                  }
                }}
              >
                Categoría
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 1,
                  height: {
                    xs: 48,
                    sm: 56
                  },
                  borderRadius: 2,
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "action.hover",
                  },
                }}
                onClick={() => setIsCategoryModalOpen(true)}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 14,
                      sm: 16
                    },
                    color: categoryName ? "text.primary" : "text.secondary",
                  }}
                >
                  {categoryName || "Seleccionar Categoría"}
                </Typography>
              </Button>
            </Box>

            {/* --- Impostores --- */}
            <Box mb={3} textAlign="center">
              <Typography 
                variant="h6" 
                fontWeight={600} 
                color="text.primary"
                sx={{
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.25rem",
                  }
                }}
              >
                Cantidad de Impostores
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={1}>
                <IconButton
                  onClick={() => setImpostorCount((p) => Math.max(1, p - 1))}
                  disabled={impostorCount <= 1}
                  sx={{ 
                    color: "primary.main",
                    fontSize: {
                      xs: "1.5rem", // Iconos más pequeños en móvil
                      sm: "2rem"    // Tamaño normal en desktop
                    }
                  }}
                >
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
                <Typography 
                  variant="h4" 
                  color="primary.main" 
                  fontWeight="bold"
                  sx={{
                    fontSize: {
                      xs: "2rem", // Número más pequeño en móvil
                      sm: "2.5rem" // Tamaño normal en desktop
                    }
                  }}
                >
                  {impostorCount}
                </Typography>
                <IconButton
                  onClick={() => setImpostorCount((p) => Math.min(maxImpostors, p + 1))}
                  disabled={impostorCount >= maxImpostors || players.length === 0}
                  sx={{ 
                    color: "primary.main",
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem"
                    }
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                mt={1}
                sx={{
                  fontSize: {
                    xs: 12,
                    sm: 14
                  }
                }}
              >
                {players.length > 0
                  ? `Máximo ${maxImpostors} impostor${maxImpostors > 1 ? "es" : ""}`
                  : "Agrega jugadores para configurar impostores"}
              </Typography>
            </Box>

            {/* --- Tiempo de Debate --- */}
            <Box mb={3} textAlign="center">
              <Typography 
                variant="h6" 
                fontWeight={600} 
                color="text.primary"
                sx={{
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.25rem",
                  }
                }}
              >
                Tiempo de Debate
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={1}>
                <IconButton
                  onClick={() => setDebateMinutes((p) => Math.max(1, p - 1))}
                  disabled={debateMinutes <= 1}
                  sx={{ 
                    color: "primary.main",
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem"
                    }
                  }}
                >
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
                <Box display="flex" alignItems="baseline">
                  <Typography 
                    variant="h4" 
                    color="primary.main" 
                    fontWeight="bold"
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        sm: "2.5rem"
                      }
                    }}
                  >
                    {debateMinutes}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      ml: 0.5,
                      fontSize: {
                        xs: 12,
                        sm: 14
                      }
                    }}
                  >
                    min
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setDebateMinutes((p) => Math.min(10, p + 1))}
                  disabled={debateMinutes >= 10}
                  sx={{ 
                    color: "primary.main",
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem"
                    }
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Botón Iniciar - posición fija en móvil */}
          <Box
            sx={{
              position: {
                xs: "sticky", // Sticky en móvil para mejor accesibilidad
                sm: "static", // Normal en desktop
              },
              bottom: 0,
              backgroundColor: "background.paper",
              pt: {
                xs: 2, // Padding superior en móvil
                sm: 0, // Sin padding en desktop
              },
            }}
          >
            <Button
              onClick={handleContinue}
              fullWidth
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              disabled={!selectedCategory || players.length < minPlayers}
              sx={{
                height: {
                  xs: 48, // Altura menor en móvil
                  sm: 56  // Altura normal en desktop
                },
                fontWeight: "bold",
                borderRadius: 2,
                fontSize: {
                  xs: "0.9rem", // Texto más pequeño en móvil
                  sm: "1rem"    // Tamaño normal en desktop
                },
                boxShadow: 3,
              }}
            >
              Iniciar Juego
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Modales */}
      <PlayersModal
        isOpen={isPlayersModalOpen}
        onClose={() => setIsPlayersModalOpen(false)}
        onSave={setPlayers}
        initialPlayers={players}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelect={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
    </Box>
  );
};

export default GameConfig;