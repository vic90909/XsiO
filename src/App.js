import React, {Component} from 'react';

import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      /> 
    );
  }

  renderRow(i){   
      return(
        <div>
          {this.renderSquare(i*10)}
          {this.renderSquare(i*10+1)}
          {this.renderSquare(i*10+2)}
          {this.renderSquare(i*10+3)}
          {this.renderSquare(i*10+4)}
          {this.renderSquare(i*10+5)}
          {this.renderSquare(i*10+6)}
          {this.renderSquare(i*10+7)}
          {this.renderSquare(i*10+8)}
          {this.renderSquare(i*10+9)}
        </div>
      )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderRow(0)}
        </div>
        <div className="board-row">
          {this.renderRow(1)}
        </div>
        <div className="board-row">
          {this.renderRow(2)}
        </div>
        <div className="board-row">
          {this.renderRow(3)}
        </div>
        <div className="board-row">
          {this.renderRow(4)}
        </div>
        <div className="board-row">
          {this.renderRow(5)}
        </div>
        <div className="board-row">
          {this.renderRow(6)}
        </div>
        <div className="board-row">
          {this.renderRow(7)}
        </div>
        <div className="board-row">
          {this.renderRow(8)}
        </div>
        <div className="board-row">
          {this.renderRow(9)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(100).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================


function calculateWinner(squares) {
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

export default Game;
