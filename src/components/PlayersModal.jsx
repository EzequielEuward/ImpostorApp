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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

export const PlayersModal = ({ isOpen, onClose, onSave, initialPlayers = [] }) => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState(initialPlayers);
  const [editingIndex, setEditingIndex] = useState(null);
  const editFieldRef = useRef(null);

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers, isOpen]);

  useEffect(() => {
    if (editingIndex !== null && editFieldRef.current) {
      editFieldRef.current.focus();
    }
  }, [editingIndex]);

  const addPlayer = () => {
    const trimmed = playerName.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setPlayerName("");
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleEdit = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const handleSaveEdit = () => {
    setEditingIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addPlayer();
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") handleSaveEdit();
    if (e.key === "Escape") setEditingIndex(null);
  };

  const handleSave = () => {
    if (players.length >= 3) {
      onSave(players);
      onClose();
    }
  };

  const handleClose = () => {
    setPlayerName("");
    setEditingIndex(null);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: "#100C1C",
          color: "white",
          p: 3,
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {/* Header - Mismo estilo que CategoryModal */}
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
            color: "#E072E5",
            fontSize: 24,
          }}
        >
          Agregar Jugadores
        </DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": { color: "white" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Contenido */}
      <DialogContent sx={{ p: 0 }}>
        <Typography sx={{ mb: 1.5, color: "white", fontWeight: "bold" }}>
          Nombre del Jugador
        </Typography>

        {/* Agregar jugador */}
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <TextField
            placeholder="Ingresa un nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "#1F1A30",
              input: { 
                color: "white",
                padding: "16.5px 14px",
                height: "1.4375em"
              },
              "& fieldset": { 
                borderColor: "rgba(224, 114, 229, 0.3)",
                borderRadius: 2
              },
              "&:hover fieldset": { 
                borderColor: "rgba(224, 114, 229, 0.7)" 
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(224, 114, 229, 0.7)"
              },
            }}
          />
          <IconButton
            onClick={addPlayer}
            disabled={!playerName.trim()}
            sx={{
              bgcolor: "#E072E5",
              color: "white",
              borderRadius: 2,
              "&:hover": { 
                bgcolor: "#d861e0" 
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(224, 114, 229, 0.3)",
                color: "rgba(255, 255, 255, 0.4)",
              },
              width: 56,
              height: 56,
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Lista de jugadores */}
        {players.length > 0 && (
          <>
            <Typography sx={{ mb: 1.5, color: "white", fontWeight: "bold" }}>
              Jugadores ({players.length})
            </Typography>

            <List sx={{ maxHeight: "300px", overflowY: "auto", pr: 1 }}>
              {players.map((player, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: "#1F1A30",
                    border: "1px solid rgba(224, 114, 229, 0.3)",
                    borderRadius: 2,
                    mb: 1,
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": { 
                      borderColor: "rgba(224, 114, 229, 0.7)" 
                    },
                  }}
                >
                  {editingIndex === index ? (
                    <TextField
                      inputRef={editFieldRef}
                      value={players[index]}
                      onChange={(e) => handleEdit(index, e.target.value)}
                      onKeyDown={handleEditKeyPress}
                      onBlur={handleSaveEdit}
                      variant="outlined"
                      fullWidth
                      size="small"
                      sx={{
                        bgcolor: "transparent",
                        input: { 
                          color: "white",
                          padding: "8px 12px"
                        },
                        "& fieldset": { 
                          borderColor: "rgba(224, 114, 229, 0.7)" 
                        },
                      }}
                    />
                  ) : (
                    <ListItemText
                      primary={player}
                      onClick={() => setEditingIndex(index)}
                      sx={{
                        flex: 1,
                        cursor: "pointer",
                        "& span": {
                          color: "white",
                          fontSize: "1rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  )}

                  <IconButton
                    onClick={() => removePlayer(index)}
                    size="small"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      "&:hover": { 
                        bgcolor: "rgba(224, 114, 229, 0.1)",
                        color: "#E072E5" 
                      },
                      ml: 1,
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>

      {/* Footer - Mismo estilo que CategoryModal */}
      <DialogActions sx={{ p: 0, mt: 3 }}>
        <Button
          onClick={handleSave}
          fullWidth
          variant="contained"
          size="large"
          disabled={players.length < 3}
          startIcon={<CheckIcon />}
          sx={{
            height: 56,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "#9E3C3C",
            color: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              bgcolor: "#B44F4F",
            },
            "&.Mui-disabled": {
              bgcolor: "rgba(158, 60, 60, 0.4)",
              color: "rgba(255, 255, 255, 0.4)",
            },
          }}
        >
          Guardar Jugadores
        </Button>
      </DialogActions>

      {players.length < 3 && (
        <Typography 
          variant="body2" 
          color="error" 
          align="center" 
          sx={{ mt: 1 }}
        >
          Se necesitan al menos 3 jugadores
        </Typography>
      )}
    </Dialog>
  );
};

export default PlayersModal;