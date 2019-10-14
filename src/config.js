const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = "https://selfish-falcon-86.localtunnel.me/";
const apiUrlProxy = proxyUrl + apiUrl;

export const config = {
  apiUrl,
  apiUrlProxy,
  movieList: apiUrlProxy + "api/v1/get",
  userExists: (username) => apiUrlProxy + `api/v1/exists/${username}`,  // 1 exists 0 does not
  getAnswers: (username) => apiUrlProxy + `api/v1/get_my/${username}`,
  postAnswers: (username, filmId, score) => apiUrlProxy + `api/v1/answer/${username}/${filmId}?answer=${score === null ? "" : score}`, // post or empty string score for null
  messages: {
    noAnswer: "Brak odpowiedzi",
    didntSee: "Nie znam",
    answers: "Odpowiedzi",
    initialPrompt: "Jak sie nazywasz?",
    userTakenPrompt: "Podane imię już zajęte, wybierz inne.",
    loading: "Ladowanie"
  }
};
