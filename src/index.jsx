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
    className={"letter-option " + props.guessedStatus}>{props.letter}</button>
  )
}

function FewLettersWarning (props) {
  if (!props.warnFewLetters) {
    return null;
  }

  return(<p className={"few-letters"}>Not enough letters</p>)
}

function LetterSelection (props) {
    return(<div className="letter-selection-container">
      <div className="letter-selection-row">
        {props.letterArray[0].map((v, i) => <LetterOption key={i} letter={v.letter} onClick={props.onClick} guessedStatus={v.guessedStatus}/>)}
      </div>
      <div className="letter-selection-row">
        {props.letterArray[1].map((v, i) => <LetterOption key={i+10} letter={v.letter} onClick={props.onClick} guessedStatus={v.guessedStatus}/>)}
      </div>
      <div className="letter-selection-row">
        {props.letterArray[2].map((v, i) => <LetterOption key={i+19}letter={v.letter} onClick={props.onClick} guessedStatus={v.guessedStatus}/>)}
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
  const [currentGuess, setCurrentGuess]     = useState(0);
  // const guessesUsed = 0;
  const [warnFewLetters, setwarnFewLetters] = useState(false);
  const theAnswer = "donut";

  const letterArray = [["q","w","e","r","t","y","u","i","o","p"],
      ["a","s","d","f","g","h","j","k","l"],
      ["enter","z","x","c","v","b","n","m", "delete"]]

  const [letterSelectionArray, setLetterSelectionArray] = useState([
    [{letter: "q", guessedStatus: ""},{letter: "w", guessedStatus: ""},{letter: "e", guessedStatus: ""},{letter: "r", guessedStatus: ""},{letter: "t", guessedStatus: ""},{letter: "y", guessedStatus: ""},{letter: "u", guessedStatus: ""},{letter: "i", guessedStatus: ""},{letter: "o", guessedStatus: ""},{letter: "p", guessedStatus: ""}],
    [{letter: "a", guessedStatus: ""},{letter: "s", guessedStatus: ""},{letter: "d", guessedStatus: ""},{letter: "f", guessedStatus: ""},{letter: "g", guessedStatus: ""},{letter: "h", guessedStatus: ""},{letter: "j", guessedStatus: ""},{letter: "k", guessedStatus: ""},{letter: "l", guessedStatus: ""}],
    [{letter: "enter", guessedStatus: ""},{letter: "z", guessedStatus: ""},{letter: "x", guessedStatus: ""},{letter: "c", guessedStatus: ""},{letter: "v", guessedStatus: ""},{letter: "b", guessedStatus: ""},{letter: "n", guessedStatus: ""},{letter: "m", guessedStatus: ""}, {letter: "delete", guessedStatus: ""}]])
  const [correctLetters, setCorrectLetters] = useState([])
  const [correctLettersCorrectPlace, setCorrectLettersCorrectPlace] = useState([])


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
    const wordIndex = Math.floor(currentGuess / 5)
    const letterIndex = (currentGuess - (Math.floor(currentGuess / 5) * 5))
    let letterSelection = letterSelectionArray

    //TODO: don't move on to the next word until you test the guess of the current word
    //TODO: allow deleting a letter
    if(i === "enter"){
      //check if there are enough letters to form a word
      if(((letterIndex)/5) !== Math.floor((letterIndex)/5)){
        setwarnFewLetters(true);
      } else {
          const wordguess = `${filledInValues[wordIndex - 1][letterIndex].letter}${filledInValues[wordIndex - 1][letterIndex+1].letter}${filledInValues[wordIndex - 1][letterIndex+2].letter}${filledInValues[wordIndex - 1][letterIndex+3].letter}${filledInValues[wordIndex - 1][letterIndex+4].letter}`
          const wordGuessArray=[filledInValues[wordIndex - 1][letterIndex],filledInValues[wordIndex - 1][letterIndex+1],filledInValues[wordIndex - 1][letterIndex+2],filledInValues[wordIndex - 1][letterIndex+3],filledInValues[wordIndex - 1][letterIndex+4]]
          const theAnswerArray = theAnswer.split("")
          //check if the word is the word
          if(wordguess === theAnswer){
            console.log("you guessed it!")
          } else{
            //check if the word is in the list
            if(wordlist.includes(wordguess)){
              //identify letters that are correctLetterAndPlace or correctLetter
              wordGuessArray.map((letterObject, letterObjectIndex) => {
                if(theAnswerArray.includes(letterObject.letter)){
                  letterObject.answerStatus = "correctLetter"
                  if(!correctLetters.includes(letterObject.letter)){
                    setCorrectLetters(correctLetters.concat(letterObject.letter))
                    console.log("about to change letter selection")

                    //TODO: pull out into its own function
                    for(let i=0; i < letterSelection.length; i++){
                      for(let j=0; j < letterSelection[i].length; j++){
                        if(letterSelection[i][j].letter == letterObject.letter){letterSelection[i][j].guessedStatus = "correctLetter"}
                      }
                    }
                  }
                  if(theAnswerArray[letterObjectIndex] == letterObject.letter){
                    letterObject.answerStatus = "correctLetterAndPlace"
                    if(!correctLettersCorrectPlace.includes(letterObject.letter)){setCorrectLettersCorrectPlace(correctLettersCorrectPlace.concat(letterObject.letter))}

                    //TODO: pull out into its own function
                    for(let i=0; i < letterSelection.length; i++){
                      for(let j=0; j < letterSelection[i].length; j++){
                        if(letterSelection[i][j].letter == letterObject.letter){letterSelection[i][j].guessedStatus = "correctLetterAndPlace"}
                      }
                    }
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
        setfilledInValues(newFilledInValues)
        setCurrentGuess(currentGuess + 1)
        setLetterSelectionArray(letterSelection)
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
      letterArray={letterSelectionArray}
      filledInValues={filledInValues}
      />
    </div>
  )
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);