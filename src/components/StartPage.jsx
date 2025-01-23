function StartPage({ startGame, setDifficulty }) {
  return (
    <div className="flex flex-col items-center gap-6 p-4 md:p-8 w-full max-w-2xl mx-auto min-h-screen md:min-h-0 justify-center  text-white">
      {/* Welcome message */}
      <div className="text-center space-y-4 px-2">
        <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
          WELCOME TO GUESS THE FLAG
        </h1>
        <p className="text-sm md:text-base opacity-90 mx-auto max-w-prose">
          The objective of the game is to correctly identify the country of the
          displayed flag by selecting the right choice from the given options.
        </p>
      </div>

      {/* Difficulty selection */}
      <div className="w-full max-w-xs md:max-w-sm space-y-4 p-4 md:p-6 bg-white/10 rounded-xl backdrop-blur-sm shadow-lg">
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium">
            Select Difficulty:
          </label>
          <select
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 md:p-4 rounded-lg border border-white/20 bg-white/5 text-black text-sm md:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          >
            <option value="easy">Easy (3 options)</option>
            <option value="medium">Medium (4 options)</option>
            <option value="hard">Hard (6 options)</option>
          </select>
        </div>

        {/* Start button */}
        <button
          className="w-full py-3 md:py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-sm md:text-base font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default StartPage;
