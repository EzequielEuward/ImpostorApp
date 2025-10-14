import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./Theme/theme";

import {
  WelcomeScreen,
  GameConfig,
  RevealCard,
  DebateTimer,
  VotingScreen,
  ResultsScreen,
} from "./components";
import { getRandomWord } from "./lib/word-category";

export const App = () => {
  const [gameState, setGameState] = useState("welcome");
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [round, setRound] = useState(1);
  const [gameMode, setGameMode] = useState("classic");
  const [debateMinutes, setDebateMinutes] = useState(2);
  const [debateTimeLeft, setDebateTimeLeft] = useState(debateMinutes * 60);
  const [debateIsRunning, setDebateIsRunning] = useState(false); // Cambiado a false inicialmente
  const [isDarkMode] = useState(false);

  useEffect(() => {
    let interval = null;

    if (debateIsRunning && debateTimeLeft > 0) {
      interval = setInterval(() => {
        setDebateTimeLeft(time => {
          if (time <= 1) {
            setDebateIsRunning(false);
            handleDebateComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (!debateIsRunning || debateTimeLeft === 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [debateIsRunning, debateTimeLeft]);

  useEffect(() => {
    if (gameState === "debate") {
      setDebateTimeLeft(debateMinutes * 60);
      setDebateIsRunning(true);
    }
  }, [round, gameState, debateMinutes]); // Agregar gameState como dependencia

  const theme = isDarkMode ? darkTheme : lightTheme;

  const startGame = () => setGameState("config");

  const handleGameConfig = (mode, categoryId, impostors, playerNames, debateTime) => {
    setGameMode(mode);
    setDebateMinutes(debateTime);

    const randomWord = getRandomWord(categoryId);
    setCurrentWord(randomWord);

    const shuffled = [...playerNames].sort(() => Math.random() - 0.5);
    const impostorIndices = shuffled.slice(0, impostors).map(name => playerNames.indexOf(name));

    const gamePlayers = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      isImpostor: impostorIndices.includes(index),
      isEliminated: false,
      word: impostorIndices.includes(index) ? undefined : randomWord,
    }));

    setPlayers(gamePlayers);
    setCurrentPlayerIndex(0);
    setGameState("reveal");
  };

  const backToWelcome = () => setGameState("welcome");

  const nextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setGameState("debate");
    }
  };

  const handleDebateComplete = () => {
    setDebateIsRunning(false);
    setGameState("voting");
  };

  const handleVote = (eliminatedPlayerId) => {
    const updatedPlayers = players.map((p) =>
      p.id === eliminatedPlayerId ? { ...p, isEliminated: true } : p
    );
    setPlayers(updatedPlayers);
    setGameState("results");
  };

  const nextRound = () => {
    const activePlayers = players.filter((p) => !p.isEliminated);
    if (activePlayers.length <= 2) return;
    setRound(round + 1);
    setGameState("debate");
  };

  const restartGame = () => {
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setCurrentWord("");
    setRound(1);
    setDebateTimeLeft(debateMinutes * 60);
    setDebateIsRunning(false);
    setGameState("welcome");
  };

  // Función para volver al debate desde la votación
  const handleBackToDebate = () => {
    // Solo permitir volver si todavía hay tiempo
    if (debateTimeLeft > 0) {
      setGameState("debate");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          transition: "all 0.3s ease",
          overflow: "hidden",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: 500,
              md: 700,
              lg: 900,
              xl: 1100,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto"
          }}
        >
          {gameState === "welcome" && <WelcomeScreen onStart={startGame} />}
          {gameState === "config" && (
            <GameConfig onBack={backToWelcome} onContinue={handleGameConfig} />
          )}
          {gameState === "reveal" && (
            <RevealCard
              player={players[currentPlayerIndex]}
              word={currentWord}
              onNext={nextPlayer}
              isLastPlayer={currentPlayerIndex === players.length - 1}
            />
          )}
          {gameState === "debate" && (
            <DebateTimer
              debateMinutes={debateMinutes}
              round={round}
              onTimeUp={handleDebateComplete}
              timeLeft={debateTimeLeft}
              setTimeLeft={setDebateTimeLeft}
              isRunning={debateIsRunning}
              setIsRunning={setDebateIsRunning}
              onRestart={restartGame}
            />
          )}
          {gameState === "voting" && (
            <VotingScreen
              players={players.filter((p) => !p.isEliminated)}
              onVote={handleVote}
              onBack={handleBackToDebate}
              timeLeft={debateTimeLeft}
              onRestart={restartGame}
            />
          )}
          {gameState === "results" && (
            <ResultsScreen
              players={players}
              onNextRound={nextRound}
              onRestart={restartGame}
              round={round}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;