import React, { useState, useEffect } from "react";
import { X, AlertTriangle, Mail, MessageSquare, Bell } from "lucide-react";
import { PopupStyle } from "../types";

const ICONS = {
  warning: AlertTriangle,
  email: Mail,
  message: MessageSquare,
  notification: Bell,
};

interface PopupProps {
  message: string;
  style: PopupStyle;
  position: { x: number; y: number };
  isFloating?: boolean;
  onClose: () => void;
}

export function Popup({
  message,
  style,
  position,
  isFloating,
  onClose,
}: PopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const Icon = ICONS[style.type];

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isFloating) return;

    const floatAnimation = () => {
      const radius = 30;
      const angle = Date.now() * 0.001;
      setCurrentPosition({
        x: position.x + Math.cos(angle) * radius,
        y: position.y + Math.sin(angle) * radius,
      });
    };

    const animationFrame = setInterval(floatAnimation, 16);
    return () => clearInterval(animationFrame);
  }, [isFloating, position]);

  return (
    <div
      style={{
        position: "fixed",
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        zIndex: 50,
      }}
      onClick={onClose}
      className={`
        bg-gradient-to-r ${style.color}
        p-4 shadow-xl cursor-pointer rounded-lg
        transition-all duration-300
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        ${isFloating ? "floating-popup" : ""}
      `}
    >
      <div className="flex items-center gap-2 text-white">
        <Icon className="w-5 h-5" />
        <p className="text-sm font-medium">{message}</p>
        <X className="w-4 h-4 ml-auto" />
      </div>
      {/* <div>
        {
          //Check if message failed
          style.type === "message" || style.type === "email" ? (
            <div> Something went wrong </div>
          ) : (
            <div> Everything in the world is fine </div>
          )
        }
      </div> */}
    </div>
  );
}
