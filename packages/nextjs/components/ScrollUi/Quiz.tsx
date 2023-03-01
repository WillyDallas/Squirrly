import { useEffect, useRef, useState } from "react";
import questions from "./questions.json";
import { ForwardIcon, BackwardIcon } from "@heroicons/react/24/outline";

interface Effect {
  econ: number;
  dipl: number;
  govt: number;
  scty: number;
}

export default function Quiz() {
  const [loading, setLoading] = useState(false);
  //const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const multiplier = {
    "Strongly Agree": 1.0,
    "Agree": 0.5,
    "Neutral": 0.0,
    "Disagree": -0.5,
    "Strongly Disagree": -1.0
  }

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };
  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleSubmit = (answer: string, ) => {

  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-between rounded-lg border border-sky-700 w-9/12 md:h-[36rem] h-[36rem]">
        <div className="flex flex-col items-center">
          <div className="mt-4 text-xl text-black text-center">{questions[currentQuestion].question}</div>
          <div className="mt-4 text-xl text-black flex flex-col items-center">
            {questions[currentQuestion].answerOptions &&
              questions[currentQuestion].answerOptions.map((el, idx) => {
                return (
                  <>
                    <button
                      className="btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-wide"
                      key={idx}
                    >
                      {el.answer}
                    </button>
                    <br></br>
                  </>
                );
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

// set type on questions. if it is type scale, hard code buttons
// if it is type fixed, loop through answer options
