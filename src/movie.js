import React from 'react';
import {config} from "./config";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {score: this.props.score};
  }

  handleAnswer = (score) => {
    this.setState({score}, this.props.next(score));
  };

  handleNoScore = (score) => {
    return score === undefined ? null : score;
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.setState({score: this.handleNoScore(this.props.score)})
  }

  getDisabled = (score, score2 = this.state.score) => {
    return score2 === score
  };

  render() {
    const {movie, next, previous, currentPage, toggleAnswers} = this.props;

    return (
      <div className="movie">
        <div className="title">{movie.title_pl}</div>
        <div className="sub-title">{movie.title_en}</div>
        <img className="poster" src={config.apiUrl + "static/images/" + movie.imdb + ".jpg"} alt=""/>

        <div className="navigation-container">
          <button className={"navigation button " + (this.getDisabled(0, currentPage) ? "disabled" : "")}
                  onClick={previous}>{"<<"}</button>
          <div className="score-button-container">
            {Array(6).fill(null).map((_, score) => {
              const disabled = this.getDisabled(score);

              return <button disabled={this.getDisabled(score)}
                             className={disabled ? "score-button button disabled" : "score-button button"} key={score}
                             onClick={() => this.handleAnswer(score)}>{score}</button>
            })}
          </div>
          <button className={"navigation button"} onClick={() => next(this.state.score)}>{">>"}</button>
          <button className={"navigation button answer-button"} onClick={toggleAnswers}>{config.messages.answers}</button>
        </div>
        <div className="long-button-container">
          <button disabled={this.getDisabled(-1)}
                  className={"long-score button" + (this.getDisabled(-1) ? " disabled" : "")}
                  onClick={() => this.handleAnswer(-1)}>{config.messages.didntSee}</button>
        </div>
      </div>
    );
  }
}

export default Movie;
