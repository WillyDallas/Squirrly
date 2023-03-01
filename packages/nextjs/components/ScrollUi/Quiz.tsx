import { use, useEffect, useRef, useState } from "react";
import idealogyQuestions from "./idealogyQuestions.json";
import preferenceQuestions from "./preferenceQuestions.json";
import questions from "./questions.json";
import { ForwardIcon, BackwardIcon } from "@heroicons/react/24/outline";

type Effect = {
  econ: number;
  dipl: number;
  govt: number;
  scty: number;
};

const dummmyEffect = {
  econ: 0,
  dipl: 0,
  govt: 0,
  scty: 0,
};

export default function Quiz() {
  //const [loading, setLoading] = useState(false);
  //const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numberAnswers, setNumberAnswers] = useState(0);

  const [econTotals, setEconTotals] = useState<number[]>([]);
  const [diplTotals, setDiplTotals] = useState<number[]>([]);
  const [govtTotals, setGovtTotals] = useState<number[]>([]);
  const [sctyTotals, setSctyTotals] = useState<number[]>([]);

  const [econAnswers, setEconAnswers] = useState<number[]>([]);
  const [diplAnswers, setDiplAnswers] = useState<number[]>([]);
  const [govtAnswers, setGovtAnswers] = useState<number[]>([]);
  const [sctyAnswers, setSctyAnswers] = useState<number[]>([]);

  const [preferences, setPreferences] = useState<string[]>([]);

  const [userPosition, setUserPosition] = useState({});
  const [userPreferences, setUserPreferences] = useState({});

  // store complex answers in arrays
  // store simple answers directly on userObject
  // store all calculate values on state

  const handlePrevious = () => {
    if (currentQuestion > 3) {
      setPreferences(preferences.slice(0, preferences.length - 1));
    }
    if (currentQuestion <= 3) {
      // remove last answer from answers array
      setEconAnswers(econAnswers.slice(0, econAnswers.length - 1));
      setDiplAnswers(diplAnswers.slice(0, diplAnswers.length - 1));
      setGovtAnswers(govtAnswers.slice(0, govtAnswers.length - 1));
      setSctyAnswers(sctyAnswers.slice(0, sctyAnswers.length - 1));

      // remove latest impact from running totals
      setEconTotals(econTotals.slice(0, econTotals.length - 1));
      setDiplTotals(diplTotals.slice(0, diplTotals.length - 1));
      setGovtTotals(govtTotals.slice(0, govtTotals.length - 1));
      setSctyTotals(sctyTotals.slice(0, sctyTotals.length - 1));
    }
    console.log("preferences", preferences);
    console.log("econ answers", econAnswers);
    console.log("econ totals", econTotals);
    const prevQues = currentQuestion - 1;
    if (currentQuestion) prevQues >= 0 && setCurrentQuestion(prevQues);
    const prevAnswer = numberAnswers - 1;
    setNumberAnswers(prevAnswer);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const increaseNumberAnswers = () => {
    const nextAnswer = numberAnswers + 1;
    setNumberAnswers(nextAnswer);
  };

  const handleIdealogyClick = (value: number, effect: Effect) => {
    // add latest answer to answers array
    setEconAnswers([...econAnswers, value * effect.econ]);
    setDiplAnswers([...diplAnswers, value * effect.dipl]);
    setGovtAnswers([...govtAnswers, value * effect.govt]);
    setSctyAnswers([...sctyAnswers, value * effect.scty]);

    // add current effect object value to running totals
    setEconTotals([...econTotals, effect.econ]);
    setDiplTotals([...diplTotals, effect.dipl]);
    setGovtTotals([...govtTotals, effect.govt]);
    setSctyTotals([...sctyTotals, effect.scty]);

    console.log("econ answers", econAnswers);
    console.log("econ totals", econTotals);

    handleNext();
    increaseNumberAnswers();
  };
  const handlePreferenceClick = (answer: string) => {
    setPreferences([...preferences, answer]);
    console.log("preferences", preferences);
    handleNext();
    increaseNumberAnswers();
  };

  const createUserObject = () => {
    const totals = {
      econ: econTotals.reduce((a, b) => Math.abs(a) + Math.abs(b), 0),
      dipl: diplTotals.reduce((a, b) => Math.abs(a) + Math.abs(b), 0),
      govt: govtTotals.reduce((a, b) => Math.abs(a) + Math.abs(b), 0),
      scty: sctyTotals.reduce((a, b) => Math.abs(a) + Math.abs(b), 0),
    };
    const answers = {
      econ: econAnswers.reduce((a, b) => a + b, 0),
      dipl: diplAnswers.reduce((a, b) => a + b, 0),
      govt: govtAnswers.reduce((a, b) => a + b, 0),
      scty: sctyAnswers.reduce((a, b) => a + b, 0),
    };
    setUserPosition({
      econ: answers.econ / totals.econ,
      dipl: answers.dipl / totals.dipl,
      govt: answers.govt / totals.govt,
      scty: answers.scty / totals.scty,
    });
    const positionObject = {
      econ: answers.econ / totals.econ,
      dipl: answers.dipl / totals.dipl,
      govt: answers.govt / totals.govt,
      scty: answers.scty / totals.scty,
    }
    setUserPreferences({
      color: preferences[0],
      tail: preferences[1],
      teeth: preferences[2]
    })
    const preferencesObject = {
      color: preferences[0],
      tail: preferences[1],
      teeth: preferences[2]
    }
    const userObject = {
      position: positionObject,
      preferences: preferencesObject
    }
    console.log(userObject)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-between rounded-lg border border-sky-700 w-9/12 md:h-[36rem] h-[36rem]">
        {numberAnswers > 6 ? (
          <button onClick={() => createUserObject()}>mint</button>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mt-4 text-xl text-black text-center">{questions[currentQuestion].question}</div>
            <div className="mt-4 text-xl text-black flex flex-col items-center">
              {questions[currentQuestion].answerOptions &&
                questions[currentQuestion].answerOptions?.map((el, idx) => {
                  return (
                    <>
                      <button
                        onClick={() => handlePreferenceClick(el.answer)}
                        className="btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-wide"
                        key={idx}
                      >
                        {el.answer}
                      </button>
                      <br></br>
                    </>
                  );
                })}
              {questions[currentQuestion].effect && (
                <>
                  <button
                    onClick={() => handleIdealogyClick(1.0, questions[currentQuestion].effect || dummmyEffect)}
                    className="btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-wide"
                  >
                    Strongly Agree
                  </button>
                  <br></br>
                  <button
                    onClick={() => handleIdealogyClick(0.5, questions[currentQuestion].effect || dummmyEffect)}
                    className="btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-wide"
                  >
                    Agree
                  </button>
                  <br></br>
                  <button
                    onClick={() => handleIdealogyClick(0.0, questions[currentQuestion].effect || dummmyEffect)}
                    className="btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-wide"
                  >
                    Neutral/Unsure
                  </button>
                  <br></br>
                  <button
                    onClick={() => handleIdealogyClick(-0.5, questions[currentQuestion].effect || dummmyEffect)}
                    className="btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-wide"
                  >
                    Disagree
                  </button>
                  <br></br>
                  <button
                    onClick={() => handleIdealogyClick(-1.0, questions[currentQuestion].effect || dummmyEffect)}
                    className="btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-wide"
                  >
                    Strongly Disagree
                  </button>
                </>
              )}
            </div>
          </div>
        )}

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
