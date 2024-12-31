import { useEffect, useState } from "react";

function GamePage({ resetGame }) {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);

  // Fetch country data
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        startNewRound(data);
      });
  }, []);

  // Start a new round with a random country
  const startNewRound = (countries) => {
    const randomCountry = getRandomCountry(countries);
    setCurrentCountry(randomCountry);
    setOptions(generateOptions(randomCountry, countries));
  };

  // Get a random country
  const getRandomCountry = (countries) => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  };

  // Generate multiple-choice options
  const generateOptions = (correctCountry, countries) => {
    const options = [correctCountry.name.common];
    while (options.length < 4) {
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
    if (selectedAnswer === currentCountry.name.common) {
      
    } else {
      alert("Wrong!");
    }
    startNewRound(countries);
  };

  if (!currentCountry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <h1>Guess the Flag</h1>
      <img
        src={currentCountry.flags.png}
        alt={`Flag of ${currentCountry.name.common}`}
        className="mx-auto mb-4 w-48 h-32 object-cover"
      />
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={resetGame}
      >
        Back to Start
      </button>
    </div>
  );
}

export default GamePage;
