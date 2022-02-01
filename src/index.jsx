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


function LetterOption (props) {
  return(
    <div><button>{props.letter}</button>
    </div>
  )
}

function LetterSelection () {
  const [letterArray, setLetterArray] = useState(["q","w","e","r","t","y","u","i","o","p",
      "a","s","d","f","g","h","j","k","l",
      "z","x","c","v","b","n","m"])

  // renderLetters(i){
  //   const letterArray = this.state.letterArray.map(<LetterOption letter={letterArray[i]} />)
  // }

    return(<div>
      <>{letterArray.map(i => <LetterOption letter={i} />)}</>
    </div>)
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