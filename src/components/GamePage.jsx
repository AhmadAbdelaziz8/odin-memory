import { useEffect, useState } from "react";

function GamePage({ resetGame, difficulty }) {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(null);

  // Fetch country data from CountriesNow API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/flag/images"
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (!data?.data) throw new Error("Invalid API response structure");

        // Transform API response to match our needs
        const countryList = data.data.map((country) => ({
          name: { common: country.name },
          flags: { png: country.flag },
        }));

        // Filter valid countries with both name and flag
        const validCountries = countryList.filter(
          (country) => country.name.common && country.flags.png
        );

        if (validCountries.length === 0) {
          throw new Error("No valid countries found");
        }

        setCountries(validCountries);
        startNewRound(validCountries);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      }
    };

    fetchCountries();
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
      const countryName = randomCountry.name.common;
      if (!options.includes(countryName)) {
        options.push(countryName);
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
    setTimeout(() => startNewRound(countries), 2000);
  };

  // Error state
  if (error) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Error Loading Game
        </h2>
        <p className="mb-4">{error}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Loading state
  if (!currentCountry) {
    return (
      <div className="p-4 text-center text-gray-600">Loading countries...</div>
    );
  }


  return (
    <div className="p-4 game-container mx-auto w-full max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center glow-text px-2">
        Guess the Flag
      </h1>
  
      {/* Score Row - Responsive Stacking */}
      <div className="grid grid-cols-3 gap-2 md:flex md:justify-between mb-4 md:mb-6 text-base md:text-xl score-display px-2">
        <div className="text-center">🏆 {score}</div>
        <div className="text-center">⭐ {bestScore}</div>
        <div className="text-center">⏳ {timeLeft}s</div>
      </div>
  
      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
        {/* Flag Image - Mobile Optimized */}
        <div className="w-full max-w-[600px] px-2">
          <img
            src={currentCountry.flags.png}
            alt={`Flag of ${currentCountry.name.common}`}
            className="w-full h-48 md:h-80 lg:h-96 object-contain rounded-xl flag-shadow"
            onError={(e) => {
              e.target.src = "/default-flag.png";
              e.target.alt = "Default flag image";
            }}
          />
        </div>
  
        {/* Answer Buttons - Mobile Constrained */}
        <div className="w-full max-w-xl px-2 flex flex-col gap-3 md:gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`p-3 md:p-4 text-base md:text-xl lg:text-2xl rounded-xl transition-all 
                ${
                  selectedAnswer
                    ? option === currentCountry.name.common
                      ? "bg-green-600 scale-105"
                      : "bg-red-600 opacity-75"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:scale-103"
                } 
                text-white font-medium w-full max-w-full md:max-w-md mx-auto 
                shadow-lg hover:shadow-xl active:scale-95 
                truncate whitespace-nowrap`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
  
      {/* Back Button - Mobile Optimized */}
      <button
        className="mt-6 md:mt-10 bg-rose-900 text-white px-4 py-2 md:px-8 md:py-4 rounded-lg md:rounded-xl mx-auto block 
        hover:bg-rose-800 transition-all duration-200 text-base md:text-lg 
        shadow-md hover:shadow-lg"
        onClick={resetGame}
      >
        ↩ Back to Start
      </button>
    </div>
  );
}
export default GamePage;
