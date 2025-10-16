import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Chip,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const PlayersModal = ({ isOpen, onClose, onSave, initialPlayers = [] }) => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState(initialPlayers);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const editFieldRef = useRef(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers, isOpen]);

  useEffect(() => {
    if (editingIndex !== null && editFieldRef.current) {
      editFieldRef.current.focus();
      setEditValue(players[editingIndex]);
    }
  }, [editingIndex, players]);

  const addPlayer = () => {
    const trimmed = playerName.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setPlayerName("");
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(players[index]);
  };

  const handleEdit = (value) => {
    setEditValue(value);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editValue.trim()) {
      const updated = [...players];
      updated[editingIndex] = editValue.trim();
      setPlayers(updated);
    }
    setEditingIndex(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addPlayer();
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") handleSaveEdit();
    if (e.key === "Escape") handleCancelEdit();
  };

  const handleSave = () => {
    if (players.length >= 3) {
      onSave(players);
      handleClose();
    }
  };

  const handleClose = () => {
    setPlayerName("");
    setEditingIndex(null);
    setEditValue("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: {
            xs: 0, // Sin bordes redondeados en móvil
            sm: 4, // Bordes redondeados en desktop
          },
          bgcolor: "background.paper",
          p: {
            xs: 2, // Menos padding en móvil
            sm: 3, // Padding normal en desktop
          },
          boxShadow: {
            xs: 0, // Sin sombra en móvil
            sm: 4, // Sombra en desktop
          },
          border: {
            xs: "none", // Sin borde en móvil
            sm: "1px solid", // Borde en desktop
          },
          borderColor: {
            sm: "divider",
          },
          margin: {
            xs: 0, // Sin margen en móvil
            sm: "32px", // Margen en desktop
          },
          maxHeight: {
            xs: "90vh", // Máxima altura en móvil
            sm: "80vh", // Máxima altura en desktop
          },
          minHeight: {
            xs: "70vh", // Altura mínima en móvil
            sm: "auto", // Altura automática en desktop
          },
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <DialogTitle
          sx={{
            p: 0,
            fontWeight: "bold",
            color: "primary.main",
            fontSize: {
              xs: "1.25rem", // Título más pequeño en móvil
              sm: "1.5rem", // Tamaño normal en desktop
            },
          }}
        >
          Agregar Jugadores
        </DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "text.secondary",
            "&:hover": { 
              color: "text.primary",
              backgroundColor: "action.hover",
            },
            fontSize: {
              xs: "1.5rem", // Icono más grande en móvil
              sm: "1.25rem", // Tamaño normal en desktop
            },
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Contenido */}
      <DialogContent 
        sx={{ 
          p: 0,
          flex: {
            xs: 1, // Ocupa espacio disponible en móvil
            sm: "none", // Altura automática en desktop
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography 
          sx={{ 
            mb: 1.5, 
            color: "text.primary", 
            fontWeight: "bold",
            fontSize: {
              xs: "0.9rem", // Texto más pequeño en móvil
              sm: "1rem", // Tamaño normal en desktop
            }
          }}
        >
          Nombre del Jugador
        </Typography>

        {/* Agregar jugador */}
        <Box 
          sx={{ 
            display: "flex", 
            gap: 1, 
            mb: 3,
            flexDirection: {
              xs: "column", // Columna en móvil
              sm: "row",    // Fila en desktop
            }
          }}
        >
          <TextField
            placeholder="Ingresa un nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "action.hover",
              input: { 
                color: "text.primary",
                padding: {
                  xs: "12.5px 14px", // Menos padding en móvil
                  sm: "16.5px 14px", // Padding normal en desktop
                },
                height: "1.4375em",
                fontSize: {
                  xs: "0.9rem", // Texto más pequeño en móvil
                  sm: "1rem", // Tamaño normal en desktop
                }
              },
              "& fieldset": { 
                borderColor: "divider",
                borderRadius: 2
              },
              "&:hover fieldset": { 
                borderColor: "primary.main" 
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main"
              },
            }}
          />
          <Button
            onClick={addPlayer}
            disabled={!playerName.trim()}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,
              minWidth: {
                xs: "100%", // Botón ancho en móvil
                sm: "auto", // Ancho automático en desktop
              },
              height: {
                xs: 48, // Altura menor en móvil
                sm: 56, // Altura normal en desktop
              },
              "&:hover": { 
                bgcolor: "primary.dark" 
              },
              "&.Mui-disabled": {
                bgcolor: "action.disabled",
                color: "text.disabled",
              },
            }}
          >
            {isMobile ? "Agregar" : "Agregar Jugador"}
          </Button>
        </Box>

        {/* Lista de jugadores */}
        {players.length > 0 && (
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                mb: 1.5 
              }}
            >
              <Typography 
                sx={{ 
                  color: "text.primary", 
                  fontWeight: "bold",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                  }
                }}
              >
                Jugadores ({players.length})
              </Typography>
              <Chip 
                label={`${players.length}/8`} 
                size="small"
                color={players.length >= 8 ? "error" : "primary"}
                variant="outlined"
              />
            </Box>

            <List 
              sx={{ 
                flex: 1,
                overflowY: "auto",
                pr: {
                  xs: 0, // Sin padding derecho en móvil
                  sm: 1, // Pequeño padding en desktop
                },
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
              {players.map((player, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: "action.hover",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    mb: 1,
                    px: {
                      xs: 1.5, // Menos padding horizontal en móvil
                      sm: 2, // Padding normal en desktop
                    },
                    py: {
                      xs: 1, // Menos padding vertical en móvil
                      sm: 1.5, // Padding normal en desktop
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": { 
                      borderColor: "primary.main",
                      bgcolor: "action.selected",
                    },
                  }}
                >
                  {editingIndex === index ? (
                    <TextField
                      inputRef={editFieldRef}
                      value={editValue}
                      onChange={(e) => handleEdit(e.target.value)}
                      onKeyDown={handleEditKeyPress}
                      onBlur={handleSaveEdit}
                      variant="outlined"
                      fullWidth
                      size="small"
                      sx={{
                        bgcolor: "transparent",
                        input: { 
                          color: "text.primary",
                          padding: "8px 12px",
                          fontSize: {
                            xs: "0.9rem",
                            sm: "1rem",
                          }
                        },
                        "& fieldset": { 
                          borderColor: "primary.main" 
                        },
                      }}
                    />
                  ) : (
                    <>
                      <ListItemText
                        primary={player}
                        onClick={() => startEdit(index)}
                        sx={{
                          flex: 1,
                          cursor: "pointer",
                          "& span": {
                            color: "text.primary",
                            fontSize: {
                              xs: "0.9rem", // Texto más pequeño en móvil
                              sm: "1rem", // Tamaño normal en desktop
                            },
                            fontWeight: 500,
                          },
                        }}
                      />
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton
                          onClick={() => startEdit(index)}
                          size="small"
                          sx={{
                            color: "text.secondary",
                            "&:hover": { 
                              bgcolor: "primary.main",
                              color: "white" 
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => removePlayer(index)}
                          size="small"
                          sx={{
                            color: "text.secondary",
                            "&:hover": { 
                              bgcolor: "error.main",
                              color: "white" 
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>

      {/* Footer */}
      <DialogActions 
        sx={{ 
          p: 0, 
          mt: 3,
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
        <Box sx={{ width: "100%" }}>
          {players.length < 3 && (
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 2,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.875rem",
                }
              }}
            >
              Se necesitan al menos 3 jugadores
            </Alert>
          )}
          
          <Button
            onClick={handleSave}
            fullWidth
            variant="contained"
            size="large"
            disabled={players.length < 3}
            startIcon={<CheckIcon />}
            sx={{
              height: {
                xs: 48, // Altura menor en móvil
                sm: 56, // Altura normal en desktop
              },
              fontSize: {
                xs: "0.9rem", // Texto más pequeño en móvil
                sm: "1rem", // Tamaño normal en desktop
              },
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
              "&.Mui-disabled": {
                bgcolor: "action.disabled",
                color: "text.disabled",
              },
            }}
          >
            Guardar Jugadores
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PlayersModal;