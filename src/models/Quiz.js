import QuizFetcher from "../data_fetchers/QuizFetcher";
import he from "he";
import _ from "lodash";


class Quiz {
  
  constructor({question, correctAnswer, incorrectAnswers}){
      this._question = question;
      this._correctAnswer = correctAnswer;
      this._incorrectAnswers = [...incorrectAnswers];
    // console.log(this._correctAnswer)
  }

  get question() {
    return this._question;
  }

  get correctAnswer () {
    return this._correctAnswer;
  }


  shuffleAnswers () {
    return _.shuffle(
      [this._correctAnswer,
      ...this._incorrectAnswers
      ])
  }

  judgeCorrectAnswer(answer){
    return answer === this._correctAnswer;
  }

  static async fetchAndCreateQuizees () {
    const quizDataList = await QuizFetcher.fetch();

    return quizDataList.results.map((result) => {
      return {
        question:he.decode(result.question),
        correctAnswer:he.decode(result.correct_answer),
        incorrectAnswers:result.incorrect_answers.map((str) => {
          return he.decode(str);
        })
      }
      // ここはオブジェクトを返すのでretrunの中を囲っている
    })
    .map(quizData => {
      return new Quiz(quizData);
    })
  }

}

export default Quiz;