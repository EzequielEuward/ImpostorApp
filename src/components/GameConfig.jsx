import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  IconButton,
  Container,
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
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(180deg, #151529 0%, #0d0d1a 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Botón volver */}
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            textTransform: "none",
            color: "#b8b4c7",
            border: "1px solid rgba(255,255,255,0.15)",
            "&:hover": {
              color: "#e855ff",
              borderColor: "#e855ff",
              backgroundColor: "rgba(232,85,255,0.08)",
            },
          }}
        >
          Volver
        </Button>
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
          justifyContent: "space-between",
        }}
      >
        {/* Contenido principal */}
        <Box sx={{ flex: 1, overflowY: "auto", pr: 1, mb: 3 }}>
          {/* --- Modo de juego --- */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600} color="#fff" mb={1}>
              Modo de Juego
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
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
                    py: 2,
                    flexDirection: "column",
                    borderRadius: 2,
                    borderWidth: 2,
                    borderColor:
                      selectedMode === mode.id
                        ? "#e855ff"
                        : "rgba(255,255,255,0.1)",
                    boxShadow:
                      selectedMode === mode.id
                        ? "0 0 15px rgba(232,85,255,0.4)"
                        : "none",
                    "&:hover": {
                      borderColor: "#e855ff",
                      boxShadow: "0 0 15px rgba(232,85,255,0.3)",
                    },
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    fontSize={{ xs: 14, sm: 16 }}
                    color="#fff"
                  >
                    {mode.label}
                  </Typography>
                  <Typography variant="body2" color="#b8b4c7">
                    {mode.desc}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>

          {/* --- Jugadores --- */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600} color="#fff">
              Jugadores
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 1,
                height: 56,
                borderRadius: 2,
                borderColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#e855ff",
                  backgroundColor: "rgba(232, 85, 255, 0.1)",
                },
              }}
              onClick={() => setIsPlayersModalOpen(true)}
              startIcon={<GroupIcon sx={{ color: "#e855ff" }} />}
            >
              {players.length > 0
                ? `${players.length} Jugador${players.length > 1 ? "es" : ""}`
                : "Agregar Jugadores"}
            </Button>
          </Box>

          {/* --- Categoría --- */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600} color="#fff">
              Categoría
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 1,
                height: 56,
                borderRadius: 2,
                borderColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#e855ff",
                  backgroundColor: "rgba(232, 85, 255, 0.1)",
                },
              }}
              onClick={() => setIsCategoryModalOpen(true)}
            >
              {categoryName || "Seleccionar Categoría"}
            </Button>
          </Box>

          {/* --- Impostores --- */}
          <Box mb={3} textAlign="center">
            <Typography variant="h6" fontWeight={600} color="#fff">
              Cantidad de Impostores
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mt={1}>
              <IconButton
                onClick={() => setImpostorCount((p) => Math.max(1, p - 1))}
                disabled={impostorCount <= 1}
                sx={{ color: "#e855ff" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h4" color="#e855ff" fontWeight="bold">
                {impostorCount}
              </Typography>
              <IconButton
                onClick={() => setImpostorCount((p) => Math.min(maxImpostors, p + 1))}
                disabled={impostorCount >= maxImpostors || players.length === 0}
                sx={{ color: "#e855ff" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="#b8b4c7" mt={1}>
              {players.length > 0
                ? `Máximo ${maxImpostors} impostor${maxImpostors > 1 ? "es" : ""}`
                : "Agrega jugadores para configurar impostores"}
            </Typography>
          </Box>

          {/* --- Tiempo de Debate --- */}
          <Box mb={3} textAlign="center">
            <Typography variant="h6" fontWeight={600} color="#fff">
              Tiempo de Debate
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mt={1}>
              <IconButton
                onClick={() => setDebateMinutes((p) => Math.max(1, p - 1))}
                disabled={debateMinutes <= 1}
                sx={{ color: "#e855ff" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h4" color="#e855ff" fontWeight="bold">
                {debateMinutes}
                <Typography variant="caption" color="#b8b4c7" sx={{ ml: 0.5 }}>
                  min
                </Typography>
              </Typography>
              <IconButton
                onClick={() => setDebateMinutes((p) => Math.min(10, p + 1))}
                disabled={debateMinutes >= 10}
                sx={{ color: "#e855ff" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Botón Iniciar */}
        <Button
          onClick={handleContinue}
          fullWidth
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
          disabled={!selectedCategory || players.length < minPlayers}
          sx={{
            height: 56,
            fontWeight: "bold",
            borderRadius: 2,
            fontSize: "1rem",
            backgroundColor: "#e855ff",
            color: "#fff",
            boxShadow: "0 0 25px rgba(232,85,255,0.4)",
            "&:hover": {
              backgroundColor: "#d43de6",
              boxShadow: "0 0 30px rgba(232,85,255,0.6)",
            },
          }}
        >
          Iniciar Juego
        </Button>
      </Card>

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
    </Container>
  );
};

export default GameConfig;
