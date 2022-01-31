import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button
      className={"square"}>
      </button>
    )
  }
}

class LetterOption extends React.Component {
  render() {
    return (
      <button
      className={"letter"}>
      </button>
    )
  }
}

class AnswerBoard extends React.Component {
  renderSquare() {
    return <Square />;
  }
    render() {
    return (
    <div>
      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row"> 
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row">
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>

      <div className="square-row"> 
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
        {this.renderSquare()}
      </div>
    </div>
    )
  }
}

class LetterSelection extends React.Component {
  renderLetterOption(i) {
    return <LetterOption letter={i}/>;
  }
  render(){
    return(
      <div>
      {this.renderLetterOption("a")}
      </div>
    )
  }
}
class Game extends React.Component {
  render(){
    return (
      <div className="game">
        <div className="answers-container"><AnswerBoard /></div>
        <div className="letters-container"><LetterSelection /></div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);