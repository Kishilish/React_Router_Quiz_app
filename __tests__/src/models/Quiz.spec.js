import Quiz from "../../../src/models/Quiz";
const createQuizMock = () => {
  return{
    question:"問題",
    correctAnswer:"正解",
    incorrectAnswers:[
      "不正解1",
      "不正解2",
      "不正解3",
    ]
  }
};


describe("Quizのテスト",() => {
  describe("インスタンス", () => {
    it("読み込みテスト",() =>{
      // console.log("@@@@@@@@@@@@@@@@@");
      // console.log(typeof Quiz);
      expect(typeof Quiz).toStrictEqual("function");
    });
    it("インスタンスメソッド",() => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      expect(quiz._question).toStrictEqual(quizData.question);
      expect(quiz._correctAnswer).toStrictEqual(quizData.correctAnswer);
      expect(quiz._incorrectAnswers).toStrictEqual(quizData.incorrectAnswers);
      
    });
    it("getterの確認",() => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      expect(quiz.question).toStrictEqual(quizData.question);
      expect(quiz.correctAnswer).toStrictEqual(quizData.correctAnswer);
      expect(quiz.incorrectAnswers).toStrictEqual(undefined);
    });
    it("shuffle", () => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      const shuffle1 = quiz.shuffleAnswers()
      // console.log(shuffle1);
      const shuffle2 = quiz.shuffleAnswers();
      // console.log(shuffle2);
      expect(shuffle1).not.toStrictEqual(shuffle2);
    });
    it("judgeCorrectAnswer",() => {
      const quizData = createQuizMock();
      const quiz = new Quiz(quizData);
      const answer = quiz.judgeCorrectAnswer(quizData.correctAnswer);
      expect(answer).toStrictEqual(true);
      quizData.incorrectAnswers.forEach((incorrectAnswer) => {
        expect(quiz.judgeCorrectAnswer(incorrectAnswer)).toStrictEqual(false);
      } )
    });
  
  });
  describe("async fetchAndCreateQuizeez", () => {
    it("１０件のQuizインスタンス",async () => {
      const quizzes = await Quiz.fetchAndCreateQuizees();
      console.log(quizzes);
      expect(Array.isArray(quizzes)).toStrictEqual(true);
      expect(quizzes.length).toStrictEqual(10);
      quizzes.forEach((quiz) => {
        expect(quiz instanceof Quiz).toStrictEqual(true);
      });
    });
  })
})