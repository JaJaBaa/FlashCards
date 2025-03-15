import { useState } from "react";
import "../styles/Flashcard.css";

function Flashcard({ card, isCorrect }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flashcard ${isFlipped ? "flipped" : ""} ${
        isCorrect !== null ? (isCorrect ? "correct-card" : "incorrect-card") : ""
      }`}
      onClick={handleClick}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">{card.question}</div>
        <div className="flashcard-back">{card.answer}</div>
      </div>
    </div>
  );
}

export default Flashcard;
