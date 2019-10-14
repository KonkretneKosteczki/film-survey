import React from 'react';
import {config} from "./config";

class Answers extends React.Component {
  formatAnswer = (score) => {
    if (score === null) return config.messages.noAnswer;
    if (score === -1) return config.messages.didntSee;
    return score;
  };

  render() {
    const {movies, scores, goToAnswer} = this.props;

    return (
      <div className="answers title">
        {scores.map((score, index) => (
          <div key={index} onClick={() => goToAnswer(index)}>{movies[index].title_pl}: {this.formatAnswer(score)}</div>
        ))}
      </div>
    )
  }
}

export default Answers;
