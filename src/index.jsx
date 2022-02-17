import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './wordlist.jsx';

function Square (props) {
    return (
      <button
      className={"square " + props.answerStatus}>{props.letter}
      </button>
    )
}

function AnswerBoard (props) {
  return (
    <div>
    { props.answerValues.map((word, wordIndex) => {
        return <div className="square-row" key={wordIndex}>
        {
          word.map((letter, letterIndex) => {
            return <Square answerStatus={letter.answerStatus} letter={letter.letter} key={`${wordIndex}-${letterIndex}`} />
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

function FewLettersWarning (props) {
  if (!props.warnFewLetters) {
    return null;
  }

  return(<p className={"few-letters"}>Not enough letters</p>)
}

function LetterSelection (props) {
  const letterArray = [["q","w","e","r","t","y","u","i","o","p"],
      ["a","s","d","f","g","h","j","k","l"],
      ["enter","z","x","c","v","b","n","m"]]

    return(<div className="letter-selection-container">
      <div className="letter-selection-row">
        {letterArray[0].map((v, i) => <LetterOption key={i} letter={v} onClick={props.onClick}/>)}
      </div>
      <div className="letter-selection-row">
        {letterArray[1].map((v, i) => <LetterOption key={i+10} letter={v} onClick={props.onClick}/>)}
      </div>
      <div className="letter-selection-row">
        {letterArray[2].map((v, i) => <LetterOption key={i+19}letter={v} onClick={props.onClick}/>)}
      </div>
    </div>)
}

function Game () {
  let initialWords = []
  for(let i = 0; i < 6; i++){
    let letters = []
    for(let j = 0; j < 5; j++){
      letters.push({answerStatus:"guessready", letter: ""})
    }
    initialWords.push(letters)
  }

  const [answerValues, setAnswerValues] = useState(initialWords);
  const [selectedLetter, setSelectedLetter] = useState ("");
  const [currentGuess, setCurrentGuess] = useState(0);
  // const guessesUsed = 0;
  const [warnFewLetters, setwarnFewLetters] = useState(false);


  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setwarnFewLetters(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [warnFewLetters]);


  function handleLetterClick(i){
    let wordIndex = Math.floor(currentGuess / 5)
    let letterIndex = (currentGuess - (Math.floor(currentGuess / 5) * 5))
    //TODO: don't move on to the next word until you test the guess of the current word
    //TODO: allow deleting a letter

    if(i==="enter"){
      //check if there are enough letters to form a word
      if((letterIndex+1)/5 !== Math.floor((letterIndex+1)/5)){
        console.log("not enough letters!")
        setwarnFewLetters(true);
      } else {
            console.log("you're trying to guess!")
            console.log(letterIndex)
      }
      //check if the words are a word
      //if so
      //show if the guessed letters are in the word
      //show if the guessed letter are in the word and in the right location
      //increment the guessesUsed
    } else{
    //TODO: can't type more than 5 letters at a time
    //TODO: play using the keyboard
    //fill in letter
    setSelectedLetter(i);
    let newAnswerValues = answerValues
    newAnswerValues[wordIndex][letterIndex] = {answerStatus:"guessed", letter: i}
    setAnswerValues(newAnswerValues)
    setCurrentGuess(currentGuess + 1)
   }
  }

  return (
    <div className="game">
      <FewLettersWarning warnFewLetters={warnFewLetters} />
      <AnswerBoard
      selectedLetter={selectedLetter}
      currentGuess={currentGuess}
      answerValues={answerValues} />
      <LetterSelection onClick={handleLetterClick}/>
    </div>
  )
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);