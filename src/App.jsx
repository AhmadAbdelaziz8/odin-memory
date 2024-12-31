import { useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);

  return (
    <>{start ? <GamePage /> : <StartPage startGame={() => setStart(true)} />}</>
  );
}

export default App;
