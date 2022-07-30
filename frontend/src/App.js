import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Home from "./components/Home/home";

function App() {
  const [training, setTraining] = useState(true);
  return (
    <div className="App">
      <Header training={training} setTraining={setTraining} />
      <Home />
    </div>
  );
}

export default App;
