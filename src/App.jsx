import { useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // Default difficulty

  return (
    <>
      {start ? (
        <GamePage resetGame={() => setStart(false)} difficulty={difficulty} />
      ) : (
        <StartPage
          startGame={() => setStart(true)}
          setDifficulty={setDifficulty}
        />
      )}
    </>
  );
}

export default App;
