function StartPage({ startGame, setDifficulty }) {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/*  Welcome message */}
      <h1 className="text-3xl font-bold">WELCOME TO GUESS THE FLAG</h1>
      <p className="text-sm font-serif text-center">
        The objective of the game is to correctly identify the country of the
        displayed flag by selecting the right choice from the given options.
      </p>
      {/* Difficulty selection */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Select Difficulty:</label>
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="easy">Easy (3 options)</option>
          <option value="medium">Medium (4 options)</option>
          <option value="hard">Hard (6 options)</option>
        </select>
      </div>

      {/* Start button */}
      <button
        className="bg-[#3343ab] text-white px-4 py-2 rounded"
        onClick={startGame}
      >
        Start Game
      </button>
    </div>
  );
}

export default StartPage;
