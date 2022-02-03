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

function AnswerBoard () {
  const [letterArray, setLetterArray] = useState([["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["z","x","c","v","b","n","m"]])

  return (
    <div>
      <div className="word-guess-row">
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
      </div>

      <div className="word-guess-row">
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
      </div>

      <div className="word-guess-row">
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
      </div>

      <div className="word-guess-row">
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
      </div>

      <div className="word-guess-row">
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
      </div>

      <div className="word-guess-row"> 
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
        <Square answerStatus={"empty"} letter={""}/>;
      </div>
        <div className="letter-selection-row"><>{letterArray[0].map((v, i) => <LetterOption key={i} letter={v} />)}</></div>
        <div className="letter-selection-row"><>{letterArray[1].map((v, i) => <LetterOption key={i+10} letter={v} />)}</></div>
        <div className="letter-selection-row"><>{letterArray[2].map((v, i) => <LetterOption key={i+19}letter={v} />)}</></div>
    </div>


  )
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

class Game extends React.Component {
  render(){
    return (
      <div className="game">
        <AnswerBoard />
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);