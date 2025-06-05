import { useCallback, useEffect, useState } from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";

export default function Wordle() {
  //   const [answer, setAnswer] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(5).fill(""));
  //   const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  //   const [attemptsLeft, setAttemptsLeft] = useState<number>(6);
  const [turn, setTurn] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );

  const handleKey = useCallback(
    (key: string) => {
      console.log("Key pressed:", key);
      if (gameState !== "playing") return;
      //if the key is a letter and the current guess is not full
      if (key.length === 1 && /^[A-Z]$/.test(key)) {
        setCurrentGuess((prev) => {
          //fill the next empty slot with the pressed key
          const newGuess = [...prev];
          const nextEmptyIndex = newGuess.findIndex((letter) => letter === "");
          if (nextEmptyIndex !== -1) {
            newGuess[nextEmptyIndex] = key;
          }
          return newGuess;
        });
        //if the key is backspace, remove the last letter
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => {
          const newGuess = [...prev];
          const firstIndex = newGuess.indexOf("");
          if (firstIndex === -1) {
            newGuess[newGuess.length - 1] = ""; // Remove the last letter
          } else if (firstIndex > 0) {
            newGuess[firstIndex - 1] = ""; // Remove the letter before the last empty slot
          }
          return newGuess;
        });
      } else if (key === "ENTER") {
        // if turn is 5 we aren't playing anymore
        if (turn >= 5) {
          setGameState("lost");
          return;
        }
        // Check if current guess is complete

        // reset current guess
        setCurrentGuess(Array(5).fill(""));
        // Increment the turn
        setTurn((prev) => {
          if (prev < 5) {
            return prev + 1;
          } else {
            // If the turn is already at max, do not increment
            return prev;
          }
        });
      }
    },
    [gameState, turn]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      handleKey(key);
    };

    const updateGrid = () => {
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[turn] = currentGuess;
        return newGrid;
      });
    };

    updateGrid();
    // Add event listener for key presses
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [gameState, currentGuess, turn, handleKey]);

  return (
    <div>
      <div className="wordle">
        {grid.map((row, index) => {
          return <Row key={index} currentGuess={row} />;
        })}
        <Keyboard onKeyPress={handleKey} />
        <footer>
          <p>
            This is a copy of the New York Times{" "}
            <a href="https://nytimes.com/games/wordle">Wordle</a> Game. For
            Learning Purposes only.
          </p>
          <p> - Made by Connor Wolfe </p>
        </footer>
      </div>
    </div>
  );
}

//What does wordle need to know
// 1. The word to guess
// 2. The current guess
// 3. The list of previous guesses
// 4. The current state of the game (win/loss)
// 5. The number of attempts left
// 6. The grid of letters
