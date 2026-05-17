import { useState, useEffect } from "react";

const MAX_INPUT_LENGTH = 5;
const MAX_TURNS = 6;

const Status = {
  INITIAL: "INITIAL",
  ABSENT: "ABSENT",
  PRESENT: "PRESENT",
  CORRECT: "CORRECT"
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
    setStatuses([...statuses, [Status.ABSENT, Status.ABSENT, Status.ABSENT, Status.ABSENT, Status.ABSENT]])
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
  statuses
}: {
  currentInput: string,
  turn: number,
  guesses: string[],
  statuses: Status[][]
}) {
  return (
    <div className="board-container">
      <Board currentInput={currentInput} turn={turn} guesses={guesses} statuses={statuses} />
    </div>
  );
}

function Board({
  currentInput,
  turn,
  guesses,
  statuses
}: {
  currentInput: string,
  turn: number,
  guesses: string[],
  statuses: Status[][]
}) {
  useEffect(() => {

  }, [guesses, currentInput]);

  const rows = [];
  for (let i = 0; i < MAX_TURNS; i++) {
    const input = turn == i ? currentInput : i < turn ? guesses[i] : "";
    const status = i < turn ? statuses[i] : [Status.INITIAL, Status.INITIAL, Status.INITIAL, Status.INITIAL, Status.INITIAL];
    rows.push(<BoardRow key={i} input={input} rowStatus={status} />);
  }

  return <div className="board">{rows}</div>;
}

function BoardRow({ input, rowStatus }: { input: string, rowStatus: Status[] }) {
  return (
    <div className="board-row">
      <Tile key={0} letter={input.length > 0 ? input[0] : ""} status={rowStatus[0]} />
      <Tile key={1} letter={input.length > 1 ? input[1] : ""} status={rowStatus[1]} />
      <Tile key={2} letter={input.length > 2 ? input[2] : ""} status={rowStatus[2]} />
      <Tile key={3} letter={input.length > 3 ? input[3] : ""} status={rowStatus[3]} />
      <Tile key={4} letter={input.length > 4 ? input[4] : ""} status={rowStatus[4]} />
    </div>
  );
}

function Tile({ letter, status }: { letter: string, status: string }) {
  const [classes, setClasses] = useState(["tile"]);
  useEffect(() => {
    if (status == Status.ABSENT) {
      setClasses(["tile", "absent"]);
    } else if (letter.length > 0) {
      setClasses(["tile", "entered"]);
    } else {
      setClasses(["tile"]);
    }
  }, [letter, status]);

  return <div className={classes.join(" ")}>{letter}</div>;
}

function Keyboard() {
  const keyValues = [
    "QWERTYUIOP".split(""),
    " ASDFGHJKL ".split(""),
    "ZXCVBNM".split(""),
  ];

  keyValues[2].unshift("ENTER");
  keyValues[2].push("DELETE");
  return (
    <div className="keyboard">
      <KeyboardRow key={0} keyValues={keyValues[0]} />
      <KeyboardRow key={1} keyValues={keyValues[1]} />
      <KeyboardRow key={2} keyValues={keyValues[2]} />
    </div>
  );
}

function KeyboardRow({ keyValues }: { keyValues: string[] }) {
  return (
    <div className="keyboard-row">
      {keyValues.map((keyValue: string, index: number) => (
        <Key key={index} letter={keyValue} />
      ))}
    </div>
  );
}

function Key({ letter }: { letter: string }) {
  if (letter == " ") {
    return <div className="half-key"></div>;
  } else if (letter.length > 1) {
    return <div className="one-and-a-half-key">{letter}</div>;
  }

  return <button className="key">{letter}</button>;
}

export default Game;
