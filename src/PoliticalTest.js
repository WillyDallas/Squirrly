import AskQuestion from "./AskQuestion"
import {useState, useEffect} from "react";
import useFetch from "./utils/useFetch";
import Results from "./Results";
const PoliticalTest = (obj) => {

    const { data: ideologies, isPending, error } = useFetch('http://localhost:8000/ideologies');

    const testobj = {
        "questions":[
            {
              "question": "Oppression by corporations is more of a concern than oppression by governments.",
              "effect": {
                  "econ": 10,
                  "dipl": 10,
                  "govt": -10,
                  "scty": -10
              }
            },
            {
              "question": "It is necessary for the government to intervene in the economy to protect consumers.",
              "effect": {
                "econ": 10,
                "dipl": 10,
                "govt": -10,
                "scty": -10
                }
            },
            {
              "question": "The freer the markets, the freer the people.",
              "effect": {
                "econ": 10,
                "dipl": 10,
                "govt": -10,
                "scty": -10
                }   
            },
        ]
    }
    
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
    }, [currentQuestion])
    
    return (  

        <div className="political-test">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/* {
            //Full Question Set
            !obj.submitted.trigger && obj.questions && <AskQuestion 
                questions={obj.questions}
                total = {obj.questions.length} 
                setSubmitted={obj.setSubmitted}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
            />} */}
            {
            //Test Question Set
            !obj.submitted.trigger && <AskQuestion 
                questions={testobj.questions}
                total = {testobj.questions.length}
                setSubmitted={obj.setSubmitted}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
            />}
            {obj.submitted.trigger && <Results
                setSubmitted={obj.setSubmitted}
                walletAddress={obj.walletAddress}
                totals={obj.submitted.totals}
                answers={obj.submitted.answers}
                setPosition={obj.setPosition}
                ideologies={ideologies}
            />}
            
        </div>

    );
}
 
export default PoliticalTest;