import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { WORD_CATEGORIES } from "../lib/word-category";

export const CategoryModal = ({
  isOpen,
  onClose,
  onSelect,
  selectedCategory,
}) => {
  const [selected, setSelected] = useState(selectedCategory || "");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownOpen = (event) => setAnchorEl(event.currentTarget);
  const handleDropdownClose = () => setAnchorEl(null);

  const handleSelectCategory = (id) => {
    setSelected(id);
    handleDropdownClose();
  };

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  const selectedCategoryName =
    WORD_CATEGORIES.find((c) => c.id === selected)?.name ||
    "Selecciona una categoría";

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
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
            color: "#E072E5",
            fontSize: 24,
          }}
        >
          Categoría de Palabras
        </DialogTitle>
        <IconButton
          onClick={onClose}
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
          Selecciona una categoría
        </Typography>

        {/* Dropdown */}
        <Button
          fullWidth
          onClick={handleDropdownOpen}
          endIcon={<ExpandMoreIcon />}
          sx={{
            height: 56,
            justifyContent: "space-between",
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "#1F1A30",
            border: "1px solid",
            borderColor: "rgba(224, 114, 229, 0.3)",
            color: selected ? "white" : "rgba(255, 255, 255, 0.7)",
            fontWeight: 500,
            pl: 2,
            pr: 1.5,
            "&:hover": {
              bgcolor: "#1F1A30",
              borderColor: "rgba(224, 114, 229, 0.7)",
            },
          }}
        >
          {selectedCategoryName}
        </Button>

        {/* Menú */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
          MenuListProps={{ sx: { py: 0.5 } }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              bgcolor: "#1F1A30",
              border: "1px solid rgba(224, 114, 229, 0.7)",
              color: "white",
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
          }}
        >
          {WORD_CATEGORIES.map((category) => (
            <MenuItem
              key={category.id}
              selected={selected === category.id}
              onClick={() => handleSelectCategory(category.id)}
              sx={{
                fontWeight: selected === category.id ? "bold" : "normal",
                "&.Mui-selected": {
                  bgcolor: "rgba(224, 114, 229, 0.15)",
                  color: "#E072E5",
                },
                "&:hover": {
                  bgcolor: "rgba(224, 114, 229, 0.1)",
                },
              }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </DialogContent>

      {/* Botón Confirmar */}
      <DialogActions sx={{ p: 0, mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!selected}
          onClick={handleConfirm}
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
          Confirmar Categoría
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;