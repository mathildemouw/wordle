import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  render() {
    return (
      <button
      className={"square"}>
        Square!
      </button>
    )
  }
}

class WordleBoard extends React.Component {
  renderSquare(i) {
    return <Square />;
  }
    render() {
    return (
    <div>
      <div className="square-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
      </div>

      <div className="square-row">
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
      </div>

      <div className="square-row"> 
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
      </div>

      <div className="square-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
      </div>

      <div className="square-row">
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
      </div>

      <div className="square-row"> 
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
      </div>
    </div>
    )
  }
}
class Game extends React.Component {
  render(){
    return (
      <div className="game">
        <WordleBoard />
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);