import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";
import flashcardData from "./data/flashcardData";

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    // Get a random index that's different from the current one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * flashcardData.length);
    } while (newIndex === currentCardIndex && flashcardData.length > 1);

    setCurrentCardIndex(newIndex);
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

      <Flashcard card={flashcardData[currentCardIndex]} />

      <div className="controls">
        <button onClick={handleNextCard}>Next Card</button>
      </div>

      <div className="instructions">
        <p>Click on a card to flip it and reveal the answer.</p>
      </div>
    </div>
  );
}

export default App;
