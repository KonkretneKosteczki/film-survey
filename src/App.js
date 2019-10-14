import React from 'react';
import './App.css';
import Movie from "./movie";
import {config} from "./config";
import Answers from "./answers";

class App extends React.Component {
  constructor(props) {
    super(props);
    const parent = this;

    function getCookie(name) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    async function getUserName(){
      const cookieUsername = getCookie("username");
      if (cookieUsername) await getAnswers(cookieUsername);
      return cookieUsername || await getUserNameFromInput();
    }

    function getUserNameFromInput(prompt = config.messages.initialPrompt){
      const username = window.prompt(prompt);
      return fetch(config.userExists(username))
        .then(res => res.text())
        .then(answer => answer === "0" ? username : getUserNameFromInput(config.messages.userTakenPrompt));
    }

    function getMovieList(){
      return fetch(config.movieList)
        .then(res => res.json())
        .then(({movies}) => movies);
    }

    function getAnswers(username){
      return fetch(config.getAnswers(username))
        .then(res => res.json())
    }

    Promise.all([getUserName(), getMovieList()])
      .then(([user, movies])=> {
        window.cookie = `username=${user}`;
        parent.setState({user,movies})
      });

    this.state = {
      movies: [],
      page: 0,
      scores: [null],
      user: null,
      showAnswers: false
    };
  }

  next = (score) => {
    const scores = this.state.scores;
    const currentPage = this.state.page;
    scores[this.state.page] = score;

    this.setState({scores: scores, page: currentPage + 1}, () => {
      console.log(this.state.scores);
    });

    fetch(config.postAnswers(this.state.user, this.state.movies[currentPage].id, score))
      .then(res => res.text())
      .then(console.log);
  };

  previous = () => {
    this.setState({page: this.state.page === 0 ? 0 : this.state.page - 1});
  };

  toggleAnswers = () => {
    this.setState({showAnswers: !this.state.showAnswers})
  };

  goToAnswer = (page) => this.setState({page, showAnswers: false});

  render() {
    return (
      <div className="App">
        {this.state.showAnswers ?
          <Answers goToAnswer={this.goToAnswer} movies={this.state.movies} scores={this.state.scores}/> :
          this.state.movies.length ?
            this.state.movies.length <= this.state.page ?
              <div>
                <span>THANK YOU</span>
                <Answers goToAnswer={this.goToAnswer} movies={this.state.movies} scores={this.state.scores}/> :
              </div> :
              <Movie next={this.next}
                     toggleAnswers={this.toggleAnswers}
                     currentPage={this.state.page}
                     previous={this.previous}
                     movie={this.state.movies[this.state.page]}
                     score={this.state.scores[this.state.page]}/> :
            <span>{config.messages.loading}</span>
        }
      </div>
    );
  }
}

export default App;
