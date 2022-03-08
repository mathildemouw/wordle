import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import wordlist from './wordlist.jsx';

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
    { props.filledInValues.map((word, wordIndex) => {
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

  const [filledInValues, setfilledInValues] = useState(initialWords);
  const [selectedLetter, setSelectedLetter] = useState ("");
  const [currentGuess, setCurrentGuess] = useState(0);
  // const guessesUsed = 0;
  const [warnFewLetters, setwarnFewLetters] = useState(false);
  const theAnswer = "donut";


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
    console.log("current guess")
    console.log(currentGuess)
    let wordIndex = Math.floor(currentGuess / 5)
    let letterIndex = (currentGuess - (Math.floor(currentGuess / 5) * 5))
    console.log("letterIndex")
    console.log(letterIndex)
    console.log("wordIndex")
    console.log(wordIndex)
    //TODO: don't move on to the next word until you test the guess of the current word
    //TODO: allow deleting a letter
    if(i==="enter"){
      //check if there are enough letters to form a word
      if(((letterIndex)/5) !== Math.floor((letterIndex)/5)){
        setwarnFewLetters(true);
      } else {
          let wordguess = `${filledInValues[wordIndex - 1][letterIndex].letter}${filledInValues[wordIndex - 1][letterIndex+1].letter}${filledInValues[wordIndex - 1][letterIndex+2].letter}${filledInValues[wordIndex - 1][letterIndex+3].letter}${filledInValues[wordIndex - 1][letterIndex+4].letter}`
          let wordguessArray=[filledInValues[wordIndex - 1][letterIndex],filledInValues[wordIndex - 1][letterIndex+1],filledInValues[wordIndex - 1][letterIndex+2],filledInValues[wordIndex - 1][letterIndex+3],filledInValues[wordIndex - 1][letterIndex+4]]
          let theAnswerArray = theAnswer.split("")
          //check if the word is the word
          if(wordguess === theAnswer){
            console.log("you guessed it!")
          } else{
            //check if the word is in the list
            if(wordlist.includes(wordguess)){
              //identify letters that are correctLetterAndPlace or correctLetter
              wordguessArray.map((letterObject, i) => {
                if(theAnswerArray.includes(letterObject.letter)){
                  letterObject.answerStatus = "correctLetter"
                  if(theAnswerArray[i] == letterObject.letter){
                    letterObject.answerStatus = "correctLetterAndPlace"
                  }
                }
              })
            } else{console.log("word is not in the list!")}
          }
      }
    } else{
      if((currentGuess !== 0) && (currentGuess/5) === Math.floor((currentGuess/5))){
        console.log("can't move on without pressing enter or deleting")
      } else {
        //TODO: can't type more than 5 letters at a time
        //fill in letter
        setSelectedLetter(i);
        let newFilledInValues = filledInValues
        newFilledInValues[wordIndex][letterIndex] = {answerStatus:"guessed", letter: i}
        setfilledInValues(newFilledInValues);
        setCurrentGuess(currentGuess + 1)
      }
    //TODO: play using the keyboard
    //TODO: style used letters in keyboard
   }
  }

  return (
    <div className="game">
      <FewLettersWarning warnFewLetters={warnFewLetters} />
      <AnswerBoard
      selectedLetter={selectedLetter}
      currentGuess={currentGuess}
      filledInValues={filledInValues} />
      <LetterSelection
      onClick={handleLetterClick}
      // filledInValues={filledInValues}
      />
    </div>
  )
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);