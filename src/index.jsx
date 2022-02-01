import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square () {
    return (
      <button
      className={"square"}>
      </button>
    )
}

class AnswerBoard extends React.Component {
  renderSquare() {
    return <Square />;
  }
    render() {
    return (
    <div>
      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row"> 
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row"> 
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>
    </div>
    )
  }
}


function LetterSelection () {
  const [letter, setLetter] = useState("a")

  return(
    <div><button>{letter}</button>
    </div>
  )
}

class Game extends React.Component {
  render(){
    return (
      <div className="game">
        <div className="answers-container"><AnswerBoard /></div>
        <div className="letters-container"><LetterSelection /></div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);