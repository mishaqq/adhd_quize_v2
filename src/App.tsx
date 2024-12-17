import React, { useState, useEffect } from "react";
import { Quiz } from "./components/Quiz";
import { Popup } from "./components/Popup";
import { POPUP_MESSAGES } from "./constants/popupMessages";
import { POPUP_COLORS } from "./constants/colors";
import { PopupStyle } from "./types";

const MAX_POPUPS = 10;
const POPUP_TYPES = ["warning", "message", "email", "notification"] as const;

function App() {
  const [popups, setPopups] = useState<
    Array<{
      id: number;
      message: string;
      style: PopupStyle;
      position: { x: number; y: number };
      isFloating: boolean;
    }>
  >([]);
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    if (!isQuizActive) return;

    const createPopup = () => {
      const type = POPUP_TYPES[Math.floor(Math.random() * POPUP_TYPES.length)];
      const messages = POPUP_MESSAGES[type];
      const message = messages[Math.floor(Math.random() * messages.length)];

      const style: PopupStyle = {
        type,
        color: POPUP_COLORS[type],
      };

      const position = {
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 200),
      };

      const isFloating = Math.random() > 0.5;

      setPopups((prev) => {
        const newPopups = [
          ...prev,
          { id: Date.now(), message, style, position, isFloating },
        ];
        return newPopups.slice(-MAX_POPUPS);
      });
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        createPopup();
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isQuizActive]);

  const removePopup = (id: number) => {
    if (id === -1) {
      setPopups([]);
    } else {
      setPopups((prev) => prev.filter((popup) => popup.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="max-w-2xl mx-auto">
        <Quiz
          onStart={() => setIsQuizActive(true)}
          onEnd={() => setIsQuizActive(false)}
          removePopup={removePopup}
        />
      </div>
      {popups.map((popup) => (
        <Popup
          key={popup.id}
          message={popup.message}
          style={popup.style}
          position={popup.position}
          isFloating={popup.isFloating}
          onClose={() => removePopup(popup.id)}
        />
      ))}
    </div>
  );
}

export default App;
