function StartPage({ startGame }) {
  return (
    <div className="flex items-stretch gap-4">
      <div className="flex flex-col gap-4">
        <h1>WELCOME TO GUESS THE FLAG</h1>
        <p className="text-sm font-serif">
          The objective of the game is to correctly identify the country of the
          displayed flag by selecting the right choice from the given options.
        </p>
      </div>
      <button
        className="bg-[#3343ab] text-white px-4 py-2 rounded flex-grow"
        onClick={() => startGame()}
      >
        Start
      </button>
    </div>
  );
}

export default StartPage;
