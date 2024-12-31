import { useEffect, useState } from "react";

function GamePage({ resetGame, difficulty }) {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Fetch country data
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        startNewRound(data);
      });
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswer(null); // Time's up
    }
  }, [timeLeft]);

  // Start a new round
  const startNewRound = (countries) => {
    const randomCountry = getRandomCountry(countries);
    setCurrentCountry(randomCountry);
    setOptions(generateOptions(randomCountry, countries));
    setTimeLeft(10);
    setSelectedAnswer(null);
  };

  // Get a random country
  const getRandomCountry = (countries) => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  };

  // Generate multiple-choice options
  const generateOptions = (correctCountry, countries) => {
    const options = [correctCountry.name.common];
    const numberOfOptions =
      difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 6;
    while (options.length < numberOfOptions) {
      const randomCountry = getRandomCountry(countries);
      if (!options.includes(randomCountry.name.common)) {
        options.push(randomCountry.name.common);
      }
    }
    return shuffleArray(options);
  };

  // Shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Handle user's answer
  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer === currentCountry.name.common) {
      setScore(score + 1);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    } else {
      setScore(0);
    }
    setTimeout(() => startNewRound(countries), 2000); // Wait 2 seconds before starting a new round
  };

  if (!currentCountry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Guess the Flag</h1>
      <div className="flex justify-between mb-4">
        <div>Score: {score}</div>
        <div>Best Score: {bestScore}</div>
        <div>Time Left: {timeLeft}s</div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Flag Image */}
        <img
          src={currentCountry.flags.png}
          alt={`Flag of ${currentCountry.name.common}`}
          className="w-64 h-48 object-cover rounded-lg shadow-lg"
        />
        {/* Options */}
        <div className="flex flex-col gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`p-3 rounded-lg text-lg ${
                selectedAnswer
                  ? option === currentCountry.name.common
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-all duration-200`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        className="mt-8 bg-red-950 text-white px-6 py-3 rounded-lg mx-auto block hover:bg-red-900 transition-all duration-200"
        onClick={resetGame}
      >
        Back to Start
      </button>
    </div>
  );
}

export default GamePage;
