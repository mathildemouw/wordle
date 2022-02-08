import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
    return (
      <button
      className={"square " + props.answerStatus}>{props.letter}
      </button>
    )
}

function AnswerBoard (props) {
  const [answerArray, setAnswerArray] = useState([
    [<Square answerStatus={"empty"} letter={""} key={0}/>,
    <Square answerStatus={"empty"} letter={""} key={1}/>,
    <Square answerStatus={"empty"} letter={""} key={2}/>,
    <Square answerStatus={"empty"} letter={""} key={3}/>,
    <Square answerStatus={"empty"} letter={""} key={4}/>,
    ],[<Square answerStatus={"empty"} letter={""} key={5}/>,
    <Square answerStatus={"empty"} letter={""} key={6}/>,
    <Square answerStatus={"empty"} letter={""} key={7}/>,
    <Square answerStatus={"empty"} letter={""} key={8}/>,
    <Square answerStatus={"empty"} letter={""} key={9}/>
    ],[<Square answerStatus={"empty"} letter={""} key={10}/>,
    <Square answerStatus={"empty"} letter={""} key={11}/>,
    <Square answerStatus={"empty"} letter={""} key={12}/>,
    <Square answerStatus={"empty"} letter={""} key={13}/>,
    <Square answerStatus={"empty"} letter={""} key={14}/>
    ],[<Square answerStatus={"empty"} letter={""} key={15}/>,
    <Square answerStatus={"empty"} letter={""} key={16}/>,
    <Square answerStatus={"empty"} letter={""} key={17}/>,
    <Square answerStatus={"empty"} letter={""} key={18}/>,
    <Square answerStatus={"empty"} letter={""} key={19}/>
    ],[<Square answerStatus={"empty"} letter={""} key={20}/>,
    <Square answerStatus={"empty"} letter={""} key={21}/>,
    <Square answerStatus={"empty"} letter={""} key={22}/>,
    <Square answerStatus={"empty"} letter={""} key={23}/>,
    <Square answerStatus={"empty"} letter={""} key={24}/>
    ],[<Square answerStatus={"empty"} letter={""} key={25}/>,
    <Square answerStatus={"empty"} letter={""} key={26}/>,
    <Square answerStatus={"empty"} letter={""} key={27}/>,
    <Square answerStatus={"empty"} letter={""} key={28}/>,
    <Square answerStatus={"empty"} letter={""} key={29}/>]
    ]);

  return (
    <div>
      <div className="square-row">
        {answerArray[0]}
      </div>

      <div className="square-row">
        {answerArray[1]}
      </div>

      <div className="square-row">
        {answerArray[2]}
      </div>

      <div className="square-row">
        {answerArray[3]}
      </div>

      <div className="square-row">
        {answerArray[4]}
      </div>

      <div className="square-row"> 
        {answerArray[5]}
      </div>
    </div>
  )
}


function LetterOption (props) {
  return(
    <button 
    onClick={() => props.onClick(props.letter)} 
    className="letter-option">{props.letter}</button>
  )
}

function LetterSelection (props) {
  const letterArray = [["q","w","e","r","t","y","u","i","o","p"],
      ["a","s","d","f","g","h","j","k","l"],
      ["z","x","c","v","b","n","m"]]

    return(<div className="letter-selection-container">
      <div className="letter-selection-row"><>{letterArray[0].map((v, i) => <LetterOption key={i} letter={v} onClick={props.onClick}/>)}</></div>
      <div className="letter-selection-row"><>{letterArray[1].map((v, i) => <LetterOption key={i+10} letter={v} onClick={props.onClick}/>)}</></div>
      <div className="letter-selection-row"><>{letterArray[2].map((v, i) => <LetterOption key={i+19}letter={v} onClick={props.onClick}/>)}</></div>
    </div>)
}

function Game () {
  const [selectedLetter, setSelectedLetter] = useState ("")
  const [currentGuess, setCurrentGuess] = useState(0);

  function handleLetterClick(i){
    console.log(i)
    setSelectedLetter(i)
    setCurrentGuess(currentGuess + 1)
  }
  return (
    <div className="game">
      <AnswerBoard selectedLetter={selectedLetter} currentGuess={currentGuess}/>
      <LetterSelection onClick={handleLetterClick}/>
    </div>
  )
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);