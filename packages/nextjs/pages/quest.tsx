import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const questions = [
  {
    id: 1,
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
  {
    id: 2,
    question: "Question 2",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  },
];

const validationSchema = Yup.object({
  answer1: Yup.string().required("Answer is required"),
  answer2: Yup.string().required("Answer is required"),
});

const Quest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleNext = () => {
    setCurrentQuestion(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  return (
    <div className="bg-amber-200 h-screen w-full">
      <div className="container mx-auto w-full px-4">
        <div className="m-8 p-4 flex justify-center mx-auto">
          <Formik
            initialValues={{ answer1: "", answer2: "" }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ }) => (
              <Form>
                {questions.map(q => (
                  <div key={q.id} className={`question ${q.id === currentQuestion ? "block" : "hidden"}`}>
                    <h2 className="text-2xl font-bold">{q.question}</h2>
                    {q.answers.map(a => (
                      <div key={a}>
                        <label>
                          <Field type="radio" name={`answer${q.id}`} value={a} />
                          {a}
                        </label>
                      </div>
                    ))}
                    <ErrorMessage name={`answer${q.id}`} component="div" className="text-red-500" />
                  </div>
                ))}
                <div className="flex justify-between mt-8 p-4">
                  {currentQuestion > 1 && (
                    <button
                      type="button"
                      className="bg-amber-600 m-2 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handlePrev}
                    >
                      Previous
                    </button>
                  )}
                  {currentQuestion < questions.length && (
                    <button
                      type="button"
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
                  {currentQuestion === questions.length && (
                    <button
                      type="submit"
                      className="bg-amber-600 m-2 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Quest;
