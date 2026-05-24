import { useState, useEffect, useRef } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import { ArrayUtils } from "../utils/arrayUtils";

const MAX_INPUT_LENGTH = 5;
const MAX_TURNS = 6;

const Status = {
  INITIAL: "INITIAL", // empty
  TBD: "TBD", // typed but not entered
  ABSENT: "ABSENT", // not in final word
  PRESENT: "PRESENT", // in final word, but not in the correct position
  CORRECT: "CORRECT", // in the correct spot
} as const;

type Status = (typeof Status)[keyof typeof Status];

function Game() {
  const [currentInput, setCurrentInput] = useState("");
  const [guesses, setGuesses] = useState<Array<string>>([]);
  const [statuses, setStatuses] = useState<Array<Array<Status>>>(
    Array.from({ length: MAX_TURNS }, () =>
      new Array(MAX_INPUT_LENGTH).fill(Status.INITIAL),
    ),
  );
  const [turn, setTurn] = useState<number>(0);

  const currentInputRef = useRef(currentInput);
  const turnRef = useRef(turn);
  const guessesRef = useRef(guesses);
  const statusesRef = useRef(statuses);

  useEffect(() => {
    startGame();

    const listener = (e: KeyboardEvent) => handleKeyInput(e.key);
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    currentInputRef.current = currentInput;
    turnRef.current = turn;
    guessesRef.current = guesses;
    statusesRef.current = statuses;
  }, [currentInput, turn, guesses, statuses]);

  const handleKeyInput = (key: string) => {
    if (turnRef.current >= MAX_TURNS) {
      return;
    }

    if (key.toLowerCase() == "backspace" || key.toLowerCase() == "delete") {
      handleBackspace();
    } else if (key.toLowerCase() == "enter") {
      handleEnter();
    } else if (isLetter(key)) {
      handleAlphabetInput(key);
    }
  };

  const handleBackspace = () => {
    if (currentInputRef.current.length <= 0) {
      return;
    }

    setCurrentInput(currentInputRef.current.substring(0, currentInputRef.current.length - 1));
    setStatuses(
      ArrayUtils.update2dArrayAt(
        statusesRef.current,
        turnRef.current,
        currentInputRef.current.length,
        Status.INITIAL,
      ),
    );
  };

  const handleEnter = () => {
    if (currentInputRef.current.length < MAX_INPUT_LENGTH || turnRef.current >= MAX_TURNS) {
      return;
    }

    if (guessesRef.current.includes(currentInputRef.current)) {
      return;
    }

    fetch("/api/game/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: currentInputRef.current }),
    });

    setStatuses(
      ArrayUtils.update2dArrayRow(
        statusesRef.current,
        turnRef.current,
        Array(MAX_INPUT_LENGTH).fill(Status.ABSENT),
      ),
    );
    setGuesses([...guessesRef.current, currentInputRef.current]);
    setCurrentInput("");
    setTurn(turnRef.current + 1);
  };

  const handleAlphabetInput = (key: string) => {
    if (currentInputRef.current.length >= MAX_INPUT_LENGTH) {
      return;
    }

    setCurrentInput(currentInputRef.current + key.toLowerCase());
    setStatuses(
      ArrayUtils.update2dArrayAt(
        statusesRef.current,
        turnRef.current,
        currentInputRef.current.length,
        Status.TBD,
      ),
    );
  };

  const isLetter = (key: string) => {
    return /^[a-zA-Z]$/m.test(key);
  };

  async function startGame() {
    const res = await fetch("/api/game/new", {
      method: "POST",
    });
    const game = await res.json();
    console.log("Game started", game);
    }

  return (
    <div className="game">
      <div className="board-container">
        <Board
          currentInput={currentInput}
          turn={turn}
          guesses={guesses}
          statuses={statuses}
        />
      </div>
      <Keyboard handleKeyInput={handleKeyInput} />
    </div>
  );
}

export { Game, MAX_INPUT_LENGTH, MAX_TURNS };
