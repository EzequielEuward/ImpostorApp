import { Box, Card, CardContent, Typography, Button, Stack, Avatar } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export const WelcomeScreen = ({ onStart }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: {
                    xs: "flex-start", // En móvil empieza desde arriba
                    sm: "center", // En tablet/desktop centrado
                },
                alignItems: "center",
                animation: "fadeIn 1s ease",
                overflow: "auto",
                py: {
                    xs: 2, // Padding vertical en móvil
                    sm: 0, // Sin padding en desktop (ya está en el layout)
                },
            }}
        >
            {/* Contenedor principal del contenido */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: {
                        xs: "100%", // En móvil ocupa todo el ancho disponible
                        sm: 400, // En desktop máximo 400px
                    },
                    textAlign: "center",
                    flex: {
                        xs: 0, // No crece en móvil
                        sm: 1, // Crece en desktop para centrar
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 3,
                }}
            >
                {/* Título */}
                <Box sx={{ position: "relative" }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            textShadow: "0 0 10px rgba(0,0,0,0.3)",
                            fontSize: {
                                xs: "2.5rem", // Tamaño más pequeño en móvil
                                sm: "3rem",   // Tamaño normal en desktop
                            },
                            mb: 1,
                        }}
                    >
                        EL IMPOSTOR
                    </Typography>
                    <Box
                        sx={{
                            position: "absolute",
                            top: -8,
                            right: {
                                xs: -4, // Posición ajustada en móvil
                                sm: -8, // Posición normal en desktop
                            },
                            width: 12,
                            height: 12,
                            bgcolor: "secondary.main",
                            borderRadius: "50%",
                            animation: "pulse 1.5s infinite",
                        }}
                    />
                    <Typography 
                        variant="subtitle1" 
                        color="text.secondary" 
                        sx={{ 
                            mt: 1,
                            fontSize: {
                                xs: "0.9rem", // Texto más pequeño en móvil
                                sm: "1rem",   // Tamaño normal en desktop
                            }
                        }}
                    >
                        ¿Quién está mintiendo?
                    </Typography>
                </Box>

                {/* Card con instrucciones */}
                <Card
                    variant="outlined"
                    sx={{
                        borderColor: "primary.main",
                        borderWidth: 1,
                        p: {
                            xs: 2, // Menos padding en móvil
                            sm: 3, // Padding normal en desktop
                        },
                        backgroundColor: "background.paper",
                        boxShadow: {
                            xs: 1, // Sombra más suave en móvil
                            sm: 3, // Sombra normal en desktop
                        },
                        mx: {
                            xs: 1, // Margen horizontal pequeño en móvil
                            sm: 0, // Sin margen en desktop
                        },
                    }}
                >
                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                        <Stack spacing={3}>
                            {/* Paso 1 */}
                            <Stack 
                                direction="row" 
                                spacing={2} 
                                alignItems="flex-start"
                                sx={{
                                    flexDirection: {
                                        xs: "column", // Columna en móvil
                                        sm: "row",    // Fila en desktop
                                    },
                                    alignItems: {
                                        xs: "center", // Centrado en móvil
                                        sm: "flex-start", // Alineado a la izquierda en desktop
                                    },
                                    textAlign: {
                                        xs: "center", // Texto centrado en móvil
                                        sm: "left",   // Texto a la izquierda en desktop
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "primary.light",
                                        color: "primary.main",
                                        width: 40,
                                        height: 40,
                                        mb: {
                                            xs: 1, // Margen inferior en móvil
                                            sm: 0, // Sin margen en desktop
                                        },
                                    }}
                                >
                                    <GroupIcon />
                                </Avatar>
                                <Box>
                                    <Typography 
                                        variant="subtitle1" 
                                        fontWeight="bold"
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                            }
                                        }}
                                    >
                                        Agrega jugadores
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{
                                            fontSize: {
                                                xs: "0.8rem",
                                                sm: "0.875rem",
                                            }
                                        }}
                                    >
                                        Mínimo 3 jugadores para comenzar
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* Paso 2 */}
                            <Stack 
                                direction="row" 
                                spacing={2} 
                                alignItems="flex-start"
                                sx={{
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    alignItems: {
                                        xs: "center",
                                        sm: "flex-start",
                                    },
                                    textAlign: {
                                        xs: "center",
                                        sm: "left",
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "primary.light",
                                        color: "primary.main",
                                        width: 40,
                                        height: 40,
                                        mb: {
                                            xs: 1,
                                            sm: 0,
                                        },
                                    }}
                                >
                                    <VisibilityIcon />
                                </Avatar>
                                <Box>
                                    <Typography 
                                        variant="subtitle1" 
                                        fontWeight="bold"
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                            }
                                        }}
                                    >
                                        Revela tu rol
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{
                                            fontSize: {
                                                xs: "0.8rem",
                                                sm: "0.875rem",
                                            }
                                        }}
                                    >
                                        Cada jugador ve su palabra en secreto
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* Paso 3 */}
                            <Stack 
                                direction="row" 
                                spacing={2} 
                                alignItems="flex-start"
                                sx={{
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    alignItems: {
                                        xs: "center",
                                        sm: "flex-start",
                                    },
                                    textAlign: {
                                        xs: "center",
                                        sm: "left",
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "primary.light",
                                        color: "primary.main",
                                        width: 40,
                                        height: 40,
                                        mb: {
                                            xs: 1,
                                            sm: 0,
                                        },
                                    }}
                                >
                                    <HowToVoteIcon />
                                </Avatar>
                                <Box>
                                    <Typography 
                                        variant="subtitle1" 
                                        fontWeight="bold"
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                            }
                                        }}
                                    >
                                        Vota al impostor
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{
                                            fontSize: {
                                                xs: "0.8rem",
                                                sm: "0.875rem",
                                            }
                                        }}
                                    >
                                        Descubre quién no tiene palabra
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>

                        {/* Botón principal */}
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{
                                mt: 4,
                                fontWeight: "bold",
                                fontSize: {
                                    xs: "0.9rem", // Texto más pequeño en móvil
                                    sm: "1rem",   // Tamaño normal en desktop
                                },
                                py: {
                                    xs: 1.5, // Padding vertical ajustado en móvil
                                    sm: 2,   // Padding normal en desktop
                                },
                            }}
                            onClick={onStart}
                        >
                            Comenzar Juego
                        </Button>
                    </CardContent>
                </Card>

                {/* Footer */}
                <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{
                        fontSize: {
                            xs: "0.7rem", // Texto más pequeño en móvil
                            sm: "0.75rem", // Tamaño normal en desktop
                        }
                    }}
                >
                    Un juego de deducción y engaño
                </Typography>
            </Box>

            {/* Animaciones simples */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
      `}</style>
        </Box>
    );
}

export default WelcomeScreen;