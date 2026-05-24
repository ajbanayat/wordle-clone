import { useEffect } from "react";
import { MAX_INPUT_LENGTH, MAX_TURNS } from "./Game";
import "./../assets/styles/Board.css";

const Status = {
  INITIAL: "INITIAL", // empty
  TBD: "TBD", // typed but not entered
  ABSENT: "ABSENT", // not in final word
  PRESENT: "PRESENT", // in final word, but not in the correct position
  CORRECT: "CORRECT", // in the correct spot
} as const;

type Status = (typeof Status)[keyof typeof Status];

function Board({
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
  useEffect(() => {}, [guesses, currentInput]);

  const rows = [];
  for (let i = 0; i < MAX_TURNS; i++) {
    const input = turn == i ? currentInput : i < turn ? guesses[i] : "";
    const status = statuses[i];
    rows.push(<BoardRow key={i} input={input} rowStatus={status} />);
  }

  return <div className="board">{rows}</div>;
}

function BoardRow({
  input,
  rowStatus,
}: {
  input: string;
  rowStatus: Status[];
}) {
  const tiles = [];
  for (let i = 0; i < MAX_INPUT_LENGTH; i++) {
    tiles.push(<Tile 
        key={i}
        letter={input.length > i ? input[i] : ""}
        status={rowStatus[i]}
    />);
  }

  return (
    <div className="board-row">
      { tiles }
    </div>
  );
}

function Tile({ letter, status }: { letter: string; status: string }) {
  const classes = ["tile"];
  if (status == Status.INITIAL) {
    classes.push("initial");
  } else if (status == Status.ABSENT) {
    classes.push("absent");
  } else if (status == Status.PRESENT) {
    classes.push("present");
  } else if (status == Status.CORRECT) {
    classes.push("correct");
  } else if (status == Status.TBD) {
    classes.push("tbd");
  }

  return <div className={classes.join(" ")}>{letter}</div>;
}

export default Board;
