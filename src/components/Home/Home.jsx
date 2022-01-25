import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Home = () =>  {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/quiz");
  }
  return(
    <div>
      <h1>Home</h1>
      <Button onClickHandler={handleClick}>データロード</Button>
    </div>  
  )
}

export default Home;