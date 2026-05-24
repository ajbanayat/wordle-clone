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
  }, [currentInput]);

  useEffect(() => {
    turnRef.current = turn;
  }, [turn]);

  useEffect(() => {
    guessesRef.current = guesses;
  }, [guesses]);

  useEffect(() => {
    statusesRef.current = statuses;
  }, [statuses]);

  const handleKeyInput = (key: string) => {
    if (turnRef.current >= MAX_TURNS) {
      return;
    }

    if (key.toLowerCase() == "backspace" || key.toLowerCase() == "delete") {
      handleBackspace(currentInputRef.current, turnRef.current, statusesRef.current);
    } else if (key.toLowerCase() == "enter") {
      handleEnter(currentInputRef.current, turnRef.current, guessesRef.current, statusesRef.current);
    } else if (isLetter(key)) {
      handleAlphabetInput(key, currentInputRef.current, turnRef.current, statusesRef.current);
    }
  };

  const handleBackspace = (currentInput: string, turn: number, statuses: Array<Array<Status>>) => {
    if (currentInput.length <= 0) {
      return;
    }

    setCurrentInput(currentInput.substring(0, currentInput.length - 1));
    setStatuses(
      ArrayUtils.update2dArrayAt(
        statuses,
        turn,
        currentInput.length - 1,
        Status.INITIAL,
      ),
    );
  };

  const handleEnter = (currentInput: string, turn: number, guesses: Array<string>, statuses: Array<Array<Status>>) => {
    if (currentInput.length < MAX_INPUT_LENGTH || turnRef.current >= MAX_TURNS) {
      return;
    }

    if (guesses.includes(currentInput)) {
      return;
    }

    fetch("/api/game/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: currentInput }),
    });

    setStatuses(
      ArrayUtils.update2dArrayRow(
        statuses,
        turn,
        Array(MAX_INPUT_LENGTH).fill(Status.ABSENT),
      ),
    );
    setGuesses([...guesses, currentInput]);
    setCurrentInput("");
    setTurn(turn + 1);
  };

  const handleAlphabetInput = (key: string, currentInput: string, turn: number, statuses: Array<Array<Status>>) => {
    if (currentInput.length >= MAX_INPUT_LENGTH) {
      return;
    }

    setCurrentInput(currentInput + key.toLowerCase());
    setStatuses(
      ArrayUtils.update2dArrayAt(
        statuses,
        turn,
        currentInput.length,
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
