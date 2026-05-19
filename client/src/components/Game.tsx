import { useState, useEffect } from "react";
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
};

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

  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeyInput(e.key));

    return () => {
      window.removeEventListener("keydown", (e) => handleKeyInput(e.key));
    };
  }, [currentInput]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/hello");
      const data = await res.json();
      console.log(data);
    })();
  }, []);

  const handleKeyInput = (key: string) => {
    if (turn >= MAX_TURNS) {
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

  const handleEnter = () => {
    if (currentInput.length < MAX_INPUT_LENGTH || turn >= MAX_TURNS) {
      return;
    }

    if (guesses.includes(currentInput)) {
      return;
    }

    // use API call

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

  const handleAlphabetInput = (key: string) => {
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

export { Game, Status, MAX_INPUT_LENGTH, MAX_TURNS };
