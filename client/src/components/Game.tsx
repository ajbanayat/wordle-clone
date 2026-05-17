import { useState, useEffect } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

const MAX_INPUT_LENGTH = 5;
const MAX_TURNS = 6;

const Status = {
  INITIAL: "INITIAL",
  ABSENT: "ABSENT",
  PRESENT: "PRESENT",
  CORRECT: "CORRECT",
};

type Status = (typeof Status)[keyof typeof Status];

function Game() {
  const [currentInput, setCurrentInput] = useState("");
  const [guesses, setGuesses] = useState<Array<string>>([]);
  const [statuses, setStatuses] = useState<Array<Array<Status>>>([]);
  const [turn, setTurn] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [currentInput]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (turn >= MAX_TURNS) {
      return;
    }

    if (event.key == "Backspace" && currentInput.length > 0) {
      setCurrentInput(currentInput.substring(0, currentInput.length - 1));
    } else if (
      event.key == "Enter" &&
      currentInput.length == MAX_INPUT_LENGTH &&
      turn < MAX_TURNS
    ) {
      onEnter();
    } else if (isLetter(event.key) && currentInput.length < MAX_INPUT_LENGTH) {
      setCurrentInput(currentInput + event.key.toLowerCase());
    }
  };

  const onEnter = () => {
    // use API call
    setStatuses([
      ...statuses,
      [
        Status.ABSENT,
        Status.ABSENT,
        Status.ABSENT,
        Status.ABSENT,
        Status.ABSENT,
      ],
    ]);
    setGuesses([...guesses, currentInput]);
    setCurrentInput("");
    setTurn(turn + 1);
  };

  const isLetter = (key: string) => {
    return /^[a-zA-Z]$/m.test(key);
  };

  return (
    <div className="game">
      <BoardContainer
        currentInput={currentInput}
        turn={turn}
        guesses={guesses}
        statuses={statuses}
      />
      <Keyboard />
    </div>
  );
}

function BoardContainer({
  currentInput,
  turn,
  guesses,
  statuses,
}: {
  currentInput: string;
  turn: number;
  guesses: string[];
  statuses: Status[][];
}) {
  return (
    <div className="board-container">
      <Board
        currentInput={currentInput}
        turn={turn}
        guesses={guesses}
        statuses={statuses}
      />
    </div>
  );
}

export { Game, Status, MAX_INPUT_LENGTH, MAX_TURNS };
