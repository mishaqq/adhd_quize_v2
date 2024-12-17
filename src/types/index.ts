export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface QuizContent {
  title: string;
  subtitle: string;
  startButton: string;
  scoreText: string;
  outOf: string;
  perfectScore: string;
  goodScore: string;
  encouragement: string;
  tryAgain: string;
  questionLabel: string;
  scoreLabel: string;
  timePerQuestion: string;
  seconds: string;
  adhd_message: string;
  learn_more: string;
}

export interface PopupStyle {
  type: 'warning' | 'message' | 'email' | 'notification';
  color: string;
}