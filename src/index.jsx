import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import wordlist from './wordlist.jsx';
import LetterSelection from './LetterSelection.jsx';
import FewLettersWarning from './FewLettersWarning.jsx'

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

function Game () {
  let initialWords = []
  for(let i = 0; i < 6; i++){
    let letters = []
    for(let j = 0; j < 5; j++){
      letters.push({answerStatus:"guessready", letter: ""})
    }
    initialWords.push(letters)
  }

  const [filledInValues, setfilledInValues]               = useState(initialWords)
  const [selectedLetter, setSelectedLetter]               = useState ("")
  const [numOfLettersGuessed, setNumOfLettersGuessed]     = useState(0)
  const [numOfWordsGuessed, setNumOfWordsGuessed]         = useState(0)
  const [warnFewLetters, setwarnFewLetters]               = useState(false);
  const theAnswer = "donut";

  const [letterSelectionArray, setLetterSelectionArray]   = useState([
    [{letter: "q", guessedStatus: ""},{letter: "w", guessedStatus: ""},{letter: "e", guessedStatus: ""},{letter: "r", guessedStatus: ""},{letter: "t", guessedStatus: ""},{letter: "y", guessedStatus: ""},{letter: "u", guessedStatus: ""},{letter: "i", guessedStatus: ""},{letter: "o", guessedStatus: ""},{letter: "p", guessedStatus: ""}],
    [{letter: "a", guessedStatus: ""},{letter: "s", guessedStatus: ""},{letter: "d", guessedStatus: ""},{letter: "f", guessedStatus: ""},{letter: "g", guessedStatus: ""},{letter: "h", guessedStatus: ""},{letter: "j", guessedStatus: ""},{letter: "k", guessedStatus: ""},{letter: "l", guessedStatus: ""}],
    [{letter: "enter", guessedStatus: ""},{letter: "z", guessedStatus: ""},{letter: "x", guessedStatus: ""},{letter: "c", guessedStatus: ""},{letter: "v", guessedStatus: ""},{letter: "b", guessedStatus: ""},{letter: "n", guessedStatus: ""},{letter: "m", guessedStatus: ""}, {letter: "delete", guessedStatus: ""}]])
  const [correctLetters, setCorrectLetters]               = useState([])
  const [correctLettersAndPlace, setCorrectLettersAndPlace] = useState([])


  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setwarnFewLetters(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [warnFewLetters]);

  function updateLetterSelection(letterObject, letterSelection, status) {
    for(let i=0; i < letterSelection.length; i++){
      for(let j=0; j < letterSelection[i].length; j++){
        if(letterSelection[i][j].letter === letterObject.letter){letterSelection[i][j].guessedStatus = status}
      }
    }
  }

  function handleLetterClick(i){
    const wordIndex = Math.floor(numOfLettersGuessed / 5)
    const letterIndex = (numOfLettersGuessed - (Math.floor(numOfLettersGuessed / 5) * 5))
    let letterSelection = letterSelectionArray
    const middleOfTheLine = ((letterIndex)/5) !== Math.floor((letterIndex)/5)

    //TODO: allow deleting a letter
    switch(i){
      case "delete":
        let newFilledInValues = filledInValues
        newFilledInValues[numOfWordsGuessed][numOfLettersGuessed -1] = {answerStatus:"guessready", letter: ""}
        setNumOfLettersGuessed(numOfLettersGuessed - 1)
        setfilledInValues(newFilledInValues)
        break;

      case "enter":
            //check if there are enough letters to form a word
        if(middleOfTheLine){
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
                setNumOfWordsGuessed(numOfWordsGuessed +1);

                //identify letters that are correctLetterAndPlace or correctLetter
                wordGuessArray.map((letterObject, letterObjectIndex) => {
                  if(theAnswerArray.includes(letterObject.letter)){
                    letterObject.answerStatus = "correctLetter"
                    if(!correctLetters.includes(letterObject.letter)){
                      setCorrectLetters(correctLetters.concat(letterObject.letter))
                      updateLetterSelection(letterObject, letterSelection, "correctLetter")
                    }
                    if(theAnswerArray[letterObjectIndex] === letterObject.letter){
                      letterObject.answerStatus = "correctLetterAndPlace"
                      if(!correctLettersAndPlace.includes(letterObject.letter)){setCorrectLettersAndPlace(correctLettersAndPlace.concat(letterObject.letter))}
                      updateLetterSelection(letterObject, letterSelection, "correctLetterAndPlace")
                    }
                  }else{
                    //style letters that are guessed but not correctLetter or correctLetterAndPlace
                  }
                })
              } else{console.log("word is not in the list!")}
            }
        }
        break;

      default:
        if((numOfLettersGuessed !== 0) && !(middleOfTheLine)&& !(numOfWordsGuessed === numOfLettersGuessed/5)){
            console.log("can't move on without pressing enter or deleting")
          } else {
            //TODO: can't type more than 5 letters at a time
            //fill in letter
            setSelectedLetter(i);
            let newFilledInValues = filledInValues
            newFilledInValues[wordIndex][letterIndex] = {answerStatus:"guessed", letter: i}
            setfilledInValues(newFilledInValues)
            setNumOfLettersGuessed(numOfLettersGuessed + 1)
            setLetterSelectionArray(letterSelection)
          }
          //TODO: play using the keyboard
    }
  }

  return (
    <div className="game">
      <FewLettersWarning warnFewLetters={warnFewLetters} />
      <AnswerBoard
      selectedLetter={selectedLetter}
      numOfLettersGuessed={numOfLettersGuessed}
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