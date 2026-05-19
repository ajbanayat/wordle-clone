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
    Array.from({ length: MAX_TURNS }, () => new Array(MAX_INPUT_LENGTH).fill(Status.INITIAL)),
  );
  const [turn, setTurn] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [currentInput]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/hello");
      const data = await res.json();
      console.log(data);
    })();
  }, []);


  const onKeyDown = (event: KeyboardEvent) => {
    if (turn >= MAX_TURNS) {
      return;
    }

    if (event.key == "Backspace" && currentInput.length > 0) {
      setCurrentInput(currentInput.substring(0, currentInput.length - 1));
      setStatuses(ArrayUtils.update2dArrayAt(statuses, turn, currentInput.length - 1, Status.INITIAL));
    } else if (
      event.key == "Enter" &&
      currentInput.length == MAX_INPUT_LENGTH &&
      turn < MAX_TURNS
    ) {
      onEnter();
    } else if (isLetter(event.key) && currentInput.length < MAX_INPUT_LENGTH) {
      setCurrentInput(currentInput + event.key.toLowerCase());
      setStatuses(ArrayUtils.update2dArrayAt(statuses, turn, currentInput.length, Status.TBD));
    }
  };

  const onEnter = () => {
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

    // use API call

    setStatuses(ArrayUtils.update2dArrayRow(statuses, turn, Array(MAX_INPUT_LENGTH).fill(Status.ABSENT)));
    setGuesses([...guesses, currentInput]);
    setCurrentInput("");
    setTurn(turn + 1);
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
      <Keyboard />
    </div>
  );
}

export { Game, Status, MAX_INPUT_LENGTH, MAX_TURNS };
