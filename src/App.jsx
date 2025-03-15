import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
import flashcardData from "./data/flashcardData";

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null); // null = not submitted, true/false = correct/incorrect
  const [viewedCards, setViewedCards] = useState([0]); // To track card history for back button
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  const handleNextCard = () => {
    // Go to next card in sequence instead of random
    const nextIndex = (currentCardIndex + 1) % flashcardData.length;
    setCurrentCardIndex(nextIndex);
    
    // Update history
    if (currentHistoryIndex === viewedCards.length - 1) {
      setViewedCards([...viewedCards, nextIndex]);
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    } else {
      // If we went back and now going forward, update history
      const newViewedCards = viewedCards.slice(0, currentHistoryIndex + 1);
      setViewedCards([...newViewedCards, nextIndex]);
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }
    
    // Reset user answer and result
    setUserAnswer("");
    setIsCorrect(null);
  };

  const handlePreviousCard = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setCurrentCardIndex(viewedCards[currentHistoryIndex - 1]);
      // Reset user answer and result
      setUserAnswer("");
      setIsCorrect(null);
    }
  };

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the answer is correct (case insensitive comparison)
    const correctAnswer = flashcardData[currentCardIndex].answer;
    const isAnswerCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    
    setIsCorrect(isAnswerCorrect);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Computer Science Trivia</h1>
        <p>
          Test your knowledge of computer science concepts with these
          flashcards!
        </p>
        <p>Total cards: {flashcardData.length}</p>
      </div>

      <Flashcard 
        card={flashcardData[currentCardIndex]} 
        isCorrect={isCorrect} 
      />

      <div className="answer-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={handleAnswerChange}
            placeholder="Enter your answer..."
            className="answer-input"
          />
          <button type="submit" className="submit-button">Check Answer</button>
        </form>
        
        {isCorrect !== null && (
          <div className={`answer-feedback ${isCorrect ? "correct" : "incorrect"}`}>
            {isCorrect 
              ? "Correct! Great job!" 
              : `Incorrect. The answer is "${flashcardData[currentCardIndex].answer}"`
            }
          </div>
        )}
      </div>

      <div className="controls">
        <button 
          onClick={handlePreviousCard} 
          disabled={currentHistoryIndex === 0}
          className="control-button"
        >
          Previous
        </button>
        <button 
          onClick={handleNextCard}
          className="control-button"
        >
          Next
        </button>
      </div>

      <div className="instructions">
        <p>Click on a card to flip it and reveal the answer.</p>
      </div>
    </div>
  );
}

export default App;
