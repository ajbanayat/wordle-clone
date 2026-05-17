import './App.css'

function App() {
  return (
    <Game />
  )
}

function Game() {
  return <div className="game">
    <BoardContainer />
    <Keyboard />
  </div>
}

function BoardContainer() {
  return <div className="board-container">
    <Board />
  </div>
}

function Board() {
  return <div className="board">
    <BoardRow />
    <BoardRow />
    <BoardRow />
    <BoardRow />
    <BoardRow />
    <BoardRow />
  </div>
}

function BoardRow() {
  return <div className="board-row">
    <Tile letter=""/>
    <Tile letter=""/>
    <Tile letter=""/>
    <Tile letter=""/>
    <Tile letter=""/>
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
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split("")
  ]

  keyValues[2].unshift("ENTER")
  keyValues[2].push("DELETE")
  return <div className="keyboard">
    <KeyboardRow keyValues={keyValues[0]} />
    <KeyboardRow keyValues={keyValues[1]} />
    <KeyboardRow keyValues={keyValues[2]} />
  </div>
}

function KeyboardRow({ keyValues }: { keyValues: Array<string> }) {
  return <div className="keyboard-row">
    {keyValues.map((keyValue: string, _) => (
      <Key letter={keyValue} />
    ))}
  </div>
}

function Key({ letter }: { letter: string }) {
  return <button className="key">
    { letter }
  </button>
}

export default App
