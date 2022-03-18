import React from 'react';
import ReactDOM from 'react-dom';

//TODO: animate few letters warning
function FewLettersWarning (props) {
  if (!props.warnFewLetters) {
    return null;
  }

  return(<p className={"few-letters"}>Not enough letters</p>)
}

export default FewLettersWarning;