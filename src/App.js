import React, { Component } from "react";
import "./App.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "-" };
  }

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      playerXturn: true,
      status: "Vez do X",
      winner: null
    };
  }

  checkWinner(squares) {
    const probabs = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ];

    return !!probabs.find(prob => {
      return (
        squares[prob[0]] === squares[prob[1]] &&
        squares[prob[1]] === squares[prob[2]] &&
        squares[prob[0]] != null
      );
    });
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const playerXturn = this.state.playerXturn;
    const nextPlayerTurn = !playerXturn ? "X" : "O";
    const actualPlayerTurn = playerXturn ? "X" : "O";
    const winner = this.state.winner;

    if (squares[i] != null || winner) return;

    squares[i] = actualPlayerTurn;

    const nextWinner = this.checkWinner(squares) ? actualPlayerTurn : winner;
    const nextStatus = this.checkWinner(squares)
      ? "Jogador " + actualPlayerTurn + " ganhou!!"
      : "Vez do " + nextPlayerTurn;

    this.setState({
      squares: squares,
      playerXturn: !playerXturn,
      status: nextStatus,
      winner: nextWinner
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">{this.state.status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "Esperando jogada..." };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{this.state.status}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}

export default App;
