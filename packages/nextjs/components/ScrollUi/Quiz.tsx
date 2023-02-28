import { useEffect, useRef, useState } from "react";
import questions from "./questions.json";

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
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center w-full">
        <h4 className="mt-10 text-xl text-black/60">
          Question {currentQuestion + 1} of {questions.length}
        </h4>
        <div className="mt-4 text-2xl text-black">{questions[currentQuestion].question}</div>
        <div className="mt-4 text-2xl text-black">
            {questions[currentQuestion].answerOptions && questions[currentQuestion].answerOptions.map((el, idx) => {
              return <p key={idx}>{el.answer}</p>;
            })}
        </div>
        <div>
          <button onClick={handlePrevious} className="w-[49%] py-3 bg-indigo-600 rounded-lg">
            Previous
          </button>
          <button onClick={handleNext} className="w-[49%] py-3 bg-indigo-600 rounded-lg">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
