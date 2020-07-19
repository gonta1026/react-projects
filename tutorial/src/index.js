import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


const calculateWinner = (squares) => {
  const linesAtWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < linesAtWin.length; i++) {
    const [a, b, c] = linesAtWin[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  renderSquare(i) {//
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {
          Array(3).fill(0).map((row, i) => {
            return (
              <div className="board-row" key={i}>
                {
                  Array(3).fill(0).map((col, j) => {
                    return(
                      <span key={i * 3 + j}>{this.renderSquare(i * 3 + j)}</span>
                      
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat({
        squares: squares
      }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let isActive;
    const moves = history.map((step, move) => {
      
      if (this.state.stepNumber === move){
        isActive = "isActive"
      } else {
        isActive = ""
      }
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li  className={isActive} key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <div>
            {
              Array(3).fill(0).map((row, i) => {
                return (
                  <div className="board-row" key={i}>
                    {
                      Array(3).fill(0).map((col, j) => {
                        return(
                        <button className="square">{step.squares[(i * 3 + j)]}</button>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(index) => this.handleClick(index)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol className="game-info__list">{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
