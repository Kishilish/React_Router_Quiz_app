import React from "react";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css"

function App() {
  return (
    <div className="App">
      {/* <h1>Hello</h1> */}
      <Router>
        <Routes>
          <Route path="/" element ={<Home/>} />
          <Route path="/quiz" element ={<Quiz/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
