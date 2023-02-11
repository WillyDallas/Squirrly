import { useState, useEffect } from 'react';

const AskQuestion = (obj) => {

    const [econTotals, setEconTotals] = useState([]);
    const [diplTotals, setDiplTotals] = useState([]);
    const [govtTotals, setGovtTotals] = useState([]);
    const [sctyTotals, setSctyTotals] = useState([]);
    const [econAnswers, setEconAnswers] = useState([]);
    const [diplAnswers, setDiplAnswers] = useState([]);
    const [govtAnswers, setGovtAnswers] = useState([]);
    const [sctyAnswers, setSctyAnswers] = useState([]);

    useEffect(() => {
    }, [obj.currentQuestion])
    
    const next_question = (value,move) => {

        if(move === -1){
            
            // remove answer from answers array
            setEconAnswers(econAnswers.slice(0,econAnswers.length-1));
            setDiplAnswers(diplAnswers.slice(0,diplAnswers.length-1));
            setGovtAnswers(govtAnswers.slice(0,govtAnswers.length-1));
            setSctyAnswers(sctyAnswers.slice(0,sctyAnswers.length-1));
            
            //remove impact from totals array
            setEconTotals(econTotals.slice(0,econTotals.length-1));
            setDiplTotals(diplTotals.slice(0,diplTotals.length-1));
            setGovtTotals(govtTotals.slice(0,govtTotals.length-1));
            setSctyTotals(sctyTotals.slice(0,sctyTotals.length-1));

            // chage question index
            obj.setCurrentQuestion(obj.currentQuestion + move);
        }
        else{

            // add answer to answers array
            setEconAnswers([...econAnswers, value * obj.questions[obj.currentQuestion].effect.econ]);
            setDiplAnswers([...diplAnswers, value * obj.questions[obj.currentQuestion].effect.dipl]);
            setGovtAnswers([...govtAnswers, value * obj.questions[obj.currentQuestion].effect.govt]);
            setSctyAnswers([...sctyAnswers, value * obj.questions[obj.currentQuestion].effect.scty]);

            // add impact to totals array
            setEconTotals([...econTotals, obj.questions[obj.currentQuestion].effect.econ]);
            setDiplTotals([...diplTotals, obj.questions[obj.currentQuestion].effect.dipl]);
            setGovtTotals([...govtTotals, obj.questions[obj.currentQuestion].effect.govt]);
            setSctyTotals([...sctyTotals, obj.questions[obj.currentQuestion].effect.scty]);

            // chage question index
            obj.setCurrentQuestion(obj.currentQuestion + move);
        }
        
    }

    const submitResults = () => {
        obj.setSubmitted({
            "trigger": true,
            "totals": {
                "econ": econTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0),
                "dipl": diplTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0),
                "govt": govtTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0),
                "scty": sctyTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0)
            },
            "answers":{
                "econ": econAnswers.reduce((a,b) => a+b, 0),
                "dipl": diplAnswers.reduce((a,b) => a+b, 0),
                "govt": govtAnswers.reduce((a,b) => a+b, 0),
                "scty": sctyAnswers.reduce((a,b) => a+b, 0)
            } 
        });
    }

    return ( 
        <div className="question">
                {obj.currentQuestion < obj.total && <p className="question" id="question-text">{obj.questions[obj.currentQuestion].question}</p>}
                {obj.currentQuestion < obj.total && <button className="stronglyAgree" onClick={() => {next_question( 1.0,1)}}>Strongly Agree</button> }<br/>
                {obj.currentQuestion < obj.total && <button className="agree" onClick={() => {next_question( 0.5,1)}}>Agree</button>} <br/>
                {obj.currentQuestion < obj.total && <button className="neutral" onClick={() => {next_question( 0.0,1)}}>Neutral/Unsure</button>} <br/>
                {obj.currentQuestion < obj.total && <button className="disagree" onClick={() => {next_question(-0.5,1)}}>Disagree</button>} <br/>
                {obj.currentQuestion < obj.total && <button className="stronglyDisagree" onClick={() => {next_question(-1.0,1)}}>Strongly Disagree</button>} <br/>
                {obj.currentQuestion < obj.total && <button className="next" onClick={() => {next_question(0,1)}}>Next</button>}
                {obj.currentQuestion === obj.total && <button className="Submit" onClick={() => {submitResults(obj.position)}}>Submit</button>}<br/>
                {obj.currentQuestion > 0 && <button className="back" onClick={() => {next_question(0,-1)}}>Back</button>} <br/>
            </div>
     );
}
 
export default AskQuestion;