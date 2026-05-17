import { useEffect, useState } from 'react'
import './App.css'

const MAX_INPUT_LENGTH = 5;

function App() {
  return (
    <Game />
  )
}

function Game() {
  const [currentInput, setCurrentInput] = useState("");
  const [turn, setTurn] = useState(0)

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    }
  }, [currentInput]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key == "Backspace" && currentInput.length > 0) {
      setCurrentInput(currentInput.substring(0, currentInput.length - 2))
    } else if (event.key == "Enter") {
      setCurrentInput("")
    } else if (isLetter(event.key) && currentInput.length < MAX_INPUT_LENGTH) {
      setCurrentInput(currentInput + event.key.toLowerCase())
    }
  }

  const isLetter = (key: string) => {
    return /^[a-zA-Z]$/m.test(key);
  }

  return <div className="game">
    <BoardContainer currentInput={currentInput} turn={turn} />
    <Keyboard />
  </div>
}

function BoardContainer({ currentInput, turn }: { currentInput: string, turn: number }) {
  return <div className="board-container">
    <Board currentInput={currentInput} turn={turn} />
  </div>
}

function Board({ currentInput, turn }: { currentInput: string, turn: number }) {
  return <div className="board">
    <BoardRow key={0} rowID={0} currentInput={currentInput} turn={turn} />
    <BoardRow key={1} rowID={1} currentInput={currentInput} turn={turn} />
    <BoardRow key={2} rowID={2} currentInput={currentInput} turn={turn} />
    <BoardRow key={3} rowID={3} currentInput={currentInput} turn={turn} />
    <BoardRow key={4} rowID={4} currentInput={currentInput} turn={turn} />
    <BoardRow key={5} rowID={5} currentInput={currentInput} turn={turn} />
  </div>
}

function BoardRow({ rowID, currentInput, turn }: { rowID: number, currentInput: string, turn: number }) {
  return <div className="board-row">
    <Tile key={0} letter={rowID == turn && currentInput.length > 0 ? currentInput[0] : ""} />
    <Tile key={1} letter={rowID == turn && currentInput.length > 1 ? currentInput[1] : ""} />
    <Tile key={2} letter={rowID == turn && currentInput.length > 2 ? currentInput[2] : ""} />
    <Tile key={3} letter={rowID == turn && currentInput.length > 3 ? currentInput[3] : ""} />
    <Tile key={4} letter={rowID == turn && currentInput.length > 4 ? currentInput[4] : ""} />
  </div>
}

function Tile({ letter }: { letter: string }) {
  return <div className="tile">
    {letter}
  </div>
}

function Keyboard() {
  const keyValues = [
    "QWERTYUIOP".split(""),
    " ASDFGHJKL ".split(""),
    "ZXCVBNM".split("")
  ]

  keyValues[2].unshift("ENTER")
  keyValues[2].push("DELETE")
  return <div className="keyboard">
    <KeyboardRow key={0} keyValues={keyValues[0]} />
    <KeyboardRow key={1} keyValues={keyValues[1]} />
    <KeyboardRow key={2} keyValues={keyValues[2]} />
  </div>
}

function KeyboardRow({ keyValues }: { keyValues: Array<string> }) {
  return <div className="keyboard-row">
    {keyValues.map((keyValue: string, index: number) => (
      <Key key={index} letter={keyValue} />
    ))}
  </div>
}

function Key({ letter }: { letter: string }) {
  if (letter == " ") {
    return <div className="half-key"></div>
  } else if (letter.length > 1) {
    return <div className="one-and-a-half-key">{ letter }</div>
  }

  return <button className="key">
    { letter }
  </button>
}

export default App
