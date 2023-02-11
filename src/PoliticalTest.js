import AskQuestion from "./AskQuestion"
import {useState, useEffect} from "react";
const PoliticalTest = (obj) => {

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
            <h2>Political Test</h2>
            {/* {obj.questions && <AskQuestion 
                questions={obj.questions}
                total = {obj.questions.length} 
                position={obj.position} 
                setPosition={obj.setPosition}
                setSubmitted={obj.setSubmitted}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
            />} */}
            <AskQuestion 
                questions={testobj.questions}
                total = {testobj.questions.length} 
                position={obj.position} 
                setPosition={obj.setPosition}
                setSubmitted={obj.setSubmitted}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
            />
        </div>

    );
}
 
export default PoliticalTest;