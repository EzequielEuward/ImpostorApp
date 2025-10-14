
import { Box, Card, CardContent, Typography, Button, Stack, Avatar } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export const WelcomeScreen = ({ onStart }) => {
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 400,
                mx: "auto",
                textAlign: "center",
                animation: "fadeIn 1s ease",
            }}
        >
            {/* Título */}
            <Box sx={{ mb: 4, position: "relative" }}>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        textShadow: "0 0 10px rgba(0,0,0,0.3)",
                    }}
                >
                    EL IMPOSTOR
                </Typography>
                <Box
                    sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 12,
                        height: 12,
                        bgcolor: "secondary.main",
                        borderRadius: "50%",
                        animation: "pulse 1.5s infinite",
                    }}
                />
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                    ¿Quién está mintiendo?
                </Typography>
            </Box>

            {/* Card con instrucciones */}
            <Card
                variant="outlined"
                sx={{
                    borderColor: "primary.main",
                    borderWidth: 1,
                    p: 3,
                    mb: 3,
                    backgroundColor: "background.paper",
                    boxShadow: 3,
                }}
            >
                <CardContent>
                    <Stack spacing={3}>
                        {/* Paso 1 */}
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Avatar
                                sx={{
                                    bgcolor: "primary.light",
                                    color: "primary.main",
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                <GroupIcon />
                            </Avatar>
                            <Box textAlign="left">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Agrega jugadores
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Mínimo 3 jugadores para comenzar
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Paso 2 */}
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Avatar
                                sx={{
                                    bgcolor: "primary.light",
                                    color: "primary.main",
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                <VisibilityIcon />
                            </Avatar>
                            <Box textAlign="left">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Revela tu rol
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Cada jugador ve su palabra en secreto
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Paso 3 */}
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Avatar
                                sx={{
                                    bgcolor: "primary.light",
                                    color: "primary.main",
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                <HowToVoteIcon />
                            </Avatar>
                            <Box textAlign="left">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Vota al impostor
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
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
                            fontSize: "1rem",
                        }}
                        onClick={onStart}
                    >
                        Comenzar Juego
                    </Button>
                </CardContent>
            </Card>

            {/* Footer */}
            <Typography variant="caption" color="text.secondary">
                Un juego de deducción y engaño
            </Typography>

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