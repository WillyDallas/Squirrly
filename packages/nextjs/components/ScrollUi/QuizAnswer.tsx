import { useEffect, useRef, useState } from "react";
import questions from "./questions.json";
import { ForwardIcon, BackwardIcon } from "@heroicons/react/24/outline";

export default function QuizAnswer() {
  const [loading, setLoading] = useState(false);
  //const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return <button className="btn-primary"></button>;
}
