import { useEffect, useRef, useState } from "react";
import questions from "./questions.json";
import { ForwardIcon, BackwardIcon } from "@heroicons/react/24/outline";

export default function Quiz() {
  const [loading, setLoading] = useState(false);
  //const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };
  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-between rounded-lg border border-sky-700 w-9/12 md:h-96 h-96">
        <div>
          <div className="mt-4 text-xl text-black">{questions[currentQuestion].question}</div>
          <div className="mt-4 text-xl text-black">
            {questions[currentQuestion].answerOptions &&
              questions[currentQuestion].answerOptions.map((el, idx) => {
                return <p key={idx}>{el.answer}</p>;
              })}
          </div>
        </div>
        <div className="w-6/12 flex flex-row justify-evenly">
          <button onClick={handlePrevious} className="w-12 py-3 bg-indigo-600 rounded-lg flex flex-row justify-center">
            <BackwardIcon className="h-8 w-8" />
          </button>
          <button onClick={handleNext} className="w-12 py-3 bg-indigo-600 rounded-lg flex flex-row justify-center">
            <ForwardIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      <h4 className="mt-10 text-xl text-black/60">
        Question {currentQuestion + 1} of {questions.length}
      </h4>
    </div>
  );
}
