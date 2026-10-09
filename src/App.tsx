import { useState } from 'react'
import './app.css'
export function Board ({ xIsNext, squares, onPlay}) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  function squaresClick (i:number) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const copyArr = squares.slice() // 创建副本
    copyArr[i] = xIsNext ? 'X' : 'O'
    onPlay(copyArr);
  }
  function Square ({value, handleClick}) {
    return (
      <button className="square" onClick={ handleClick }>{ value }</button>
    )
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => squaresClick(0) } />
        <Square value={squares[1]} handleClick={() => squaresClick(1) } />
        <Square value={squares[2]} handleClick={() => squaresClick(2) } />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => squaresClick(3) } />
        <Square value={squares[4]} handleClick={() => squaresClick(4) } />
        <Square value={squares[5]} handleClick={() => squaresClick(5) } />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => squaresClick(6) } />
        <Square value={squares[7]} handleClick={() => squaresClick(7) } />
        <Square value={squares[8]} handleClick={() => squaresClick(8) } />
      </div>
    </>
  )
}
function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game () {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 === 0
  const handlePlay = function (nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory([...history, nextSquares]);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }
  function Movies ({ history, jumpTo }) {
    return history.map((squares, move) => {
      let description
      if (move > 0) {
        description = 'Go to move #' + move
      } else {
        description = 'Go to game start'
      }
      return (
        <li key={ move }>
          <button onClick={() => jumpTo(move)}>{ description }</button>
        </li>
      )
    })
  }


  function Test () {
    const [a, setA] = useState(0)
    function change () {
      setA(a => a+2)
      setA(a => a+2)
      setA(a => a+2)
      console.log(a)
    }
    function show () {
      console.log(a)
    }
    return (
      <>
        <div>{a}</div>
        <button onClick={change}>按钮</button>
        <button onClick={show}>看A</button>
      </>
    )
  }

  return (
    <div className='game'>
      <Test></Test>
      <div className='game-board'>
        <Board xIsNext={ xIsNext } squares={ currentSquares } onPlay={handlePlay}></Board>
      </div>
      <div className='game-info'>
        <ol>
          <Movies history={ history } jumpTo={ jumpTo } />
        </ol>
      </div>
    </div>
  )
}