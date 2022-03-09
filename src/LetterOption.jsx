import React from 'react';
import ReactDOM from 'react-dom';

function LetterOption (props) {
  return(
    <button 
    onClick={() => props.onClick(props.letter)} 
    className={"letter-option " + props.guessedStatus}>{props.letter}</button>
  )
}

export default LetterOption;