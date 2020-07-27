import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i, line = false, hoge) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        line={line}
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
                      <span key={i * 3 + j}>{this.renderSquare(i * 3 + j, this.props.line.indexOf(i * 3 + j) !== -1, )}</span>
                      
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

export default Board;