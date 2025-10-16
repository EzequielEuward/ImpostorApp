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
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
            xs: 0, // Sin sombra en móvil (ocupará pantalla completa)
            sm: 4, // Sombra en desktop
          },
          border: {
            xs: "none", // Sin borde en móvil
            sm: "1px solid", // Borde en desktop
          },
          borderColor: {
            sm: "divider",
          },
          minHeight: {
            xs: "60vh", // Altura mínima en móvil
            sm: "auto", // Altura automática en desktop
          },
          margin: {
            xs: 0, // Sin margen en móvil
            sm: "32px", // Margen en desktop
          },
          maxHeight: {
            xs: "90vh", // Máxima altura en móvil
            sm: "80vh", // Máxima altura en desktop
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
          Categoría de Palabras
        </DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { 
              color: "text.primary",
              backgroundColor: "action.hover",
            },
            fontSize: {
              xs: "1.5rem", // Icono más grande en móvil para mejor táctil
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
          Selecciona una categoría
        </Typography>

        {/* Dropdown */}
        <Button
          fullWidth
          onClick={handleDropdownOpen}
          endIcon={<ExpandMoreIcon />}
          sx={{
            height: {
              xs: 48, // Altura menor en móvil
              sm: 56, // Altura normal en desktop
            },
            justifyContent: "space-between",
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "action.hover",
            border: "1px solid",
            borderColor: "divider",
            color: selected ? "text.primary" : "text.secondary",
            fontWeight: 500,
            pl: 2,
            pr: 1.5,
            fontSize: {
              xs: "0.9rem", // Texto más pequeño en móvil
              sm: "1rem", // Tamaño normal en desktop
            },
            "&:hover": {
              bgcolor: "action.selected",
              borderColor: "primary.main",
            },
          }}
        >
          <Typography 
            noWrap
            sx={{
              flex: 1,
              textAlign: "left",
              fontSize: "inherit",
            }}
          >
            {selectedCategoryName}
          </Typography>
        </Button>

        {/* Menú */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
          MenuListProps={{ 
            sx: { 
              py: 0.5,
              maxHeight: {
                xs: "60vh", // Altura máxima en móvil
                sm: "40vh", // Altura máxima en desktop
              },
            } 
          }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              width: anchorEl ? anchorEl.clientWidth : undefined,
              maxWidth: {
                xs: "calc(100vw - 32px)", // Ancho máximo en móvil
                sm: "none", // Ancho automático en desktop
              },
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {WORD_CATEGORIES.map((category) => (
            <MenuItem
              key={category.id}
              selected={selected === category.id}
              onClick={() => handleSelectCategory(category.id)}
              sx={{
                fontWeight: selected === category.id ? "bold" : "normal",
                fontSize: {
                  xs: "0.9rem", // Texto más pequeño en móvil
                  sm: "1rem", // Tamaño normal en desktop
                },
                py: {
                  xs: 1.5, // Más padding vertical en móvil
                  sm: 1, // Padding normal en desktop
                },
                "&.Mui-selected": {
                  bgcolor: "action.selected",
                  color: "primary.main",
                },
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </DialogContent>

      {/* Botón Confirmar */}
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
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!selected}
          onClick={handleConfirm}
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
          Confirmar Categoría
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;