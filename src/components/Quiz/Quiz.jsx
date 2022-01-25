import React from "react";
import QuizModel from "../../models/Quiz"
import {Link} from "react-router-dom"
import Button from "../Button/Button";
import "./Quiz.css"

class Quiz extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
    currentIndex : 0,
    numberOfCorrect : 0,
    quizzes:[]
  }

  }
  async componentDidMount(){
    await this.restart();
  }
  async restart() {
    this.setState({
      currentIndex:0,
      numberOfCorrect:0,
    });
    const quizzes = await QuizModel.fetchAndCreateQuizees();
    console.log(quizzes)
    this.setState({
      quizzes
    });
  }

  renderLoading() {
    return(
      <div>
        <h1>クイズページ</h1>
        <p>loading...</p>
        <hr />
        <Link to="/">トップページ</Link>

      </div>
    );
  }

  selectAnswer(quiz,answer){
    let {numberOfCorrect, currentIndex} = this.state;
    const isCorrect = quiz.judgeCorrectAnswer(answer);
    if(isCorrect) {
      alert("正解です！！！！");
      numberOfCorrect++;
    } else {
      alert(`不正解です。正解は”${quiz.correctAnswer}”`)
    }
    currentIndex++;
    this.setState({
      numberOfCorrect,
      currentIndex
    })
  }


  renderQuiz() {
    const { currentIndex, quizzes} = this.state;
    const quiz = quizzes[currentIndex];
    console.log(quiz);
    const quizItem = quiz.shuffleAnswers().map((answer, index) => {
      return(
        <li key={index}>
          <Button onClickHandler = {() => {
             this.selectAnswer(quiz, answer);

          }}>{answer}</Button>
        </li>
      );
    });


    return (
      <div>
        <h1>クイズデータ</h1>
        <div>
          <p>{quiz.question}</p>
          <ul className="Quizlist">{quizItem}</ul>
          <hr />
          <Link to="/">トップページ</Link>
        </div>
      </div>
    );
  }
  renderFinish(){
    const {numberOfCorrect,quizzes} = this.state;

    return(
      <div>
        <h1>クイズ終了</h1>
        <p>{`${numberOfCorrect} / ${quizzes.length} Correct!`}</p>
        <hr />
        <Button onClickHandler={this.restart} >データロード</Button>
        <Link to="/">トップページ</Link>
      </div>
    );
  }


  render() {
    const {currentIndex, quizzes} = this.state;
    if(quizzes.length === 0){
      return this.renderLoading();
    }
    if(quizzes.length > 0  && currentIndex < quizzes.length){
      return this.renderQuiz();
    }
    if(currentIndex >= quizzes.length){
      return this.renderFinish();
    }
    
    return(
      <div>
        <h1>Quiz</h1>
      </div>
    )

  }

} 


export default Quiz;