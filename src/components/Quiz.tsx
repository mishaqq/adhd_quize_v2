import React, { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { Timer } from "./Timer";
import { ADHDMessage } from "./ADHDMessage";
import { questions } from "../constants/questions";
import { QUESTION_BACKGROUND_COLORS } from "../constants/colors";

const INACTIVITY_TIMEOUT = 20000; // 20 seconds of inactivity

interface QuizProps {
  onStart: () => void;
  onEnd: () => void;
  removePopup: (id: number) => void;
}

export function Quiz({ onStart, onEnd, removePopup }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [started, setStarted] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    if (!started || showScore) return;

    const checkInactivity = () => {
      if (Date.now() - lastInteraction >= INACTIVITY_TIMEOUT) {
        handleReset();
      }
    };

    const interval = setInterval(checkInactivity, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [started, showScore, lastInteraction]);

  useEffect(() => {
    if (!started || showScore) return;

    const updateInteraction = () => setLastInteraction(Date.now());
    window.addEventListener("mousemove", updateInteraction);
    window.addEventListener("click", updateInteraction);
    window.addEventListener("keydown", updateInteraction);

    return () => {
      window.removeEventListener("mousemove", updateInteraction);
      window.removeEventListener("click", updateInteraction);
      window.removeEventListener("keydown", updateInteraction);
    };
  }, [started, showScore]);

  const handleStart = () => {
    setStarted(true);
    setLastInteraction(Date.now());
    onStart();
  };

  const handleAnswer = (selectedOption: number) => {
    setLastInteraction(Date.now());
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      removePopup(-1); // -1 is a special id to remove all popups
      onEnd();
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setStarted(false);
    removePopup(-1); // -1 is a special id to remove all popups
    onEnd();
  };

  if (!started) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center animate-fade-in">
        <Brain className="w-16 h-16 mx-auto text-purple-600 mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Chaos Quiz Challenge
        </h1>
        <p className="text-gray-600 mb-8">
          Let's do a simple test! Good luck!
          <br />
          <span className="text-sm text-red-500">
            Quiz will restart after 20 seconds of inactivity!
          </span>
        </p>
        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transform transition hover:scale-105"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed! 🎉</h2>
        <p className="text-2xl mb-4">
          Your Score: {score} out of {questions.length}
        </p>
        <p className="text-gray-600 mb-6">
          {score === questions.length
            ? "Perfect score! Amazing focus! 🌟"
            : score >= questions.length / 2
            ? "Well done! Great concentration! 👏"
            : "Keep trying! Focus takes practice 💪"}
        </p>
        <button
          onClick={handleReset}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transform transition hover:scale-105 mb-8"
        >
          Try Again
        </button>
        <ADHDMessage />
      </div>
    );
  }

  const timeLeft = Math.max(
    0,
    Math.floor((INACTIVITY_TIMEOUT - (Date.now() - lastInteraction)) / 1000)
  );

  return (
    <div
      className={`${QUESTION_BACKGROUND_COLORS[currentQuestion]} rounded-xl shadow-2xl p-8 transition-colors duration-300`}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-500">
            Question {currentQuestion + 1}/{questions.length}
          </span>
          <span className="text-sm font-semibold text-purple-600">
            Score: {score}
          </span>
        </div>
        <Timer timeLeft={timeLeft} isWarning={timeLeft <= 10} />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {questions[currentQuestion].question}
        </h2>
      </div>
      <div className="grid gap-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="bg-white hover:bg-purple-50 text-left p-4 rounded-lg transition-colors duration-200 hover:shadow-md"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
