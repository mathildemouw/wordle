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
    let initialWords = []
    for(let i = 0; i < 6; i++){
      let letters = []
      for(let j = 0; j < 5; j++){
        letters.push({answerStatus:"empty", letter: ""})
      }
      initialWords.push(letters)
    }

  const [answerValues, setAnswerValues] = useState(initialWords);

  return (
    <div>
    { answerValues.map((word, wordIndex) => {
        return <div className="square-row" key={wordIndex}>
        {
          word.map((letter, letterIndex) => {
            return <Square answerStatus={letter.answerStatus} letter={letter.value} key={`${wordIndex}-${letterIndex}`} />
          })
        }
      </div>
    }) }
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