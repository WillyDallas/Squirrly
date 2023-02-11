import { useState, useEffect } from 'react';

const AskQuestion = (obj) => {

    const [choices, setChoices] = useState([]);
    const [econTotals, setEconTotals] = useState([]);
    const [diplTotals, setDiplTotals] = useState([]);
    const [govtTotals, setGovtTotals] = useState([]);
    const [sctyTotals, setSctyTotals] = useState([]);

    useEffect(() => {
    }, [obj.currentQuestion])

    function getRandomNumbers() {
        let randomNumbers = [];
        for (let i = 0; i < 4; i++) {
          randomNumbers.push(Math.floor(Math.random() * 101));
        }
        return randomNumbers;
    }
    
    const next_question = (value,move) => {

        if(move === -1){
            setChoices(choices.slice(0,choices.length-1));
            obj.setPosition([
                obj.position[0] - value*obj.questions[obj.currentQuestion-1].effect.econ, 
                obj.position[1] - value*obj.questions[obj.currentQuestion-1].effect.dipl, 
                obj.position[2] - value*obj.questions[obj.currentQuestion-1].effect.govt, 
                obj.position[3] - value*obj.questions[obj.currentQuestion-1].effect.scty
            ]);
            
            obj.setCurrentQuestion(obj.currentQuestion + move);
            
            setEconTotals(econTotals.slice(0,econTotals.length-1));
            setDiplTotals(diplTotals.slice(0,diplTotals.length-1));
            setGovtTotals(govtTotals.slice(0,govtTotals.length-1));
            setSctyTotals(sctyTotals.slice(0,sctyTotals.length-1));
        }
        else{
            
            obj.setPosition([
                obj.position[0] + value*obj.questions[obj.currentQuestion].effect.econ, 
                obj.position[1] + value*obj.questions[obj.currentQuestion].effect.dipl, 
                obj.position[2] + value*obj.questions[obj.currentQuestion].effect.govt, 
                obj.position[3] + value*obj.questions[obj.currentQuestion].effect.scty
            ]);
            obj.setCurrentQuestion(obj.currentQuestion + move);
            setChoices([...choices, value]);

            setEconTotals([...econTotals, obj.questions[obj.currentQuestion].effect.econ]);
            setDiplTotals([...diplTotals, obj.questions[obj.currentQuestion].effect.dipl]);
            setGovtTotals([...govtTotals, obj.questions[obj.currentQuestion].effect.govt]);
            setSctyTotals([...sctyTotals, obj.questions[obj.currentQuestion].effect.scty]);
        }
        
    }

    const submitResults = (position) => {
        obj.setSubmitted({
            "trigger": true,
            "totals": {
                "econ": econTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0),
                "dipl": diplTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0),
                "govt": govtTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0),
                "scty": sctyTotals.reduce((a,b) => Math.abs(a)+ Math.abs(b), 0)
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
                {obj.currentQuestion > 0 && <button className="back" onClick={() => {next_question(choices[choices.length-1],-1)}}>Back</button>} <br/>
                {/*
                    The Skip button is set to send dummy values to the position array for testing purposes and this should be deleted when the test is complete.
                */}
                <button className="skip" onClick={() => {submitResults(obj.setPosition(getRandomNumbers()))}}>Skip</button> <br/>
            </div>
     );
}
 
export default AskQuestion;