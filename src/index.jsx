import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    return (
      <button
      className={"square " + props.answerStatus}>{props.letter}
      </button>
    )
}

class AnswerBoard extends React.Component {
  renderSquare() {
    return <Square answerStatus={"empty"} letter={""}/>;
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
    <button 
    onClick={() => handleLetterClick(props.letter)} 
    className="letter-option">{props.letter}</button>
  )
}

function handleLetterClick(i){
  console.log("got here!")
}

function LetterSelection () {
  const [letterArray, setLetterArray] = useState([["q","w","e","r","t","y","u","i","o","p"],
      ["a","s","d","f","g","h","j","k","l"],
      ["z","x","c","v","b","n","m"]])

    return(<div className="letter-selection-container">
      <div className="letter-selection-row"><>{letterArray[0].map((v, i) => <LetterOption key={i} letter={v} />)}</></div>
      <div className="letter-selection-row"><>{letterArray[1].map((v, i) => <LetterOption key={i+10} letter={v} />)}</></div>
      <div className="letter-selection-row"><>{letterArray[2].map((v, i) => <LetterOption key={i+19}letter={v} />)}</></div>
    </div>)
}

class Game extends React.Component {
  render(){
    return (
      <div className="game">
        <AnswerBoard />
        <LetterSelection />
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);