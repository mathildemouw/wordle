import React from 'react';
import ReactDOM from 'react-dom';
import LetterOption from './LetterOption.jsx';

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

export default LetterSelection;