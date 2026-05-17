import './App.css'

function App() {
  return (
    <Game />
  )
}

function Game() {
  return <div className="game">
    <BoardContainer />
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

export default App
