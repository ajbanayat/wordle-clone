import { useState, useEffect } from "react";
import { Status, MAX_TURNS } from "./Game";
import "./../assets/styles/Board.css";

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
  return (
    <div className="board-row">
      <Tile
        key={0}
        letter={input.length > 0 ? input[0] : ""}
        status={rowStatus[0]}
      />
      <Tile
        key={1}
        letter={input.length > 1 ? input[1] : ""}
        status={rowStatus[1]}
      />
      <Tile
        key={2}
        letter={input.length > 2 ? input[2] : ""}
        status={rowStatus[2]}
      />
      <Tile
        key={3}
        letter={input.length > 3 ? input[3] : ""}
        status={rowStatus[3]}
      />
      <Tile
        key={4}
        letter={input.length > 4 ? input[4] : ""}
        status={rowStatus[4]}
      />
    </div>
  );
}

function Tile({ letter, status }: { letter: string; status: string }) {
  const [classes, setClasses] = useState(["tile"]);
  useEffect(() => {
    if (status == Status.INITIAL) {
      setClasses(["tile", "initial"]);
    } else if (status == Status.ABSENT) {
      setClasses(["tile", "absent"]);
    } else if (status == Status.PRESENT) {
      setClasses(["tile", "present"]);
    } else if (status == Status.CORRECT) {
      setClasses(["tile, correct"]);
    } else if (status == Status.TBD) {
      setClasses(["tile", "tbd"]);
    }
  }, [status]);

  return <div className={classes.join(" ")}>{letter}</div>;
}

export default Board;
