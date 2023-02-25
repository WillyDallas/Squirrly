import { useState, useEffect } from 'react';

//This module should use PUSH protocol to send messages to users who have minted the necessary NFT that a new question 
//has been added to the test. 

//This module should also serve the question to the website, allow users to log in, and allow users to submit their answer.

//This process should happen over the course of x days, one question per day

//After the time alloted by the smart contract has passed, the module should sort users into teams based on their 
//position on the political spectrum, and then allow them to form coalitions with other users to take control of the game treasury funds


//ETHDenver 2023


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
        let randomTest = Math.random();
        console.log(randomTest);
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

    const setDummyResults = () => {
        obj.setSubmitted({
            "trigger": true,
            "answers": {
                "econ": Math.random(),
                "dipl": Math.random(),
                "govt": Math.random(),
                "scty": Math.random(),
            },
            "totals":{
                "econ": Math.random() >= .5 ? 1 : -1,
                "dipl": Math.random() >= .5 ? 1 : -1,
                "govt": Math.random() >= .5 ? 1 : -1,
                "scty": Math.random() >= .5 ? 1 : -1
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
                {obj.currentQuestion < obj.total && <button className="next" onClick={() => {next_question(0,1)}}>Next</button>} <br/>
                {obj.currentQuestion === obj.total && <button className="Submit" onClick={() => {submitResults(obj.position)}}>Submit</button>} {obj.currentQuestion === obj.total &&<br/>}
                {obj.currentQuestion > 0 && <button className="back" onClick={() => {next_question(0,-1)}}>Back</button>} {obj.currentQuestion > 0 && <br/>}
                {<button className="Submit" onClick={() => {setDummyResults()}}>Random Test</button>}
            </div>
     );
}
 
export default AskQuestion;