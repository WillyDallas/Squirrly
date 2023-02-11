import useFetch from "./utils/useFetch";
import PoliticalTest from "./PoliticalTest";
import Results from "./Results";
import { useState, useEffect } from "react";


const Home = () => {

    const { data: questions, isPending, error } = useFetch('http://localhost:8000/questions');
    const [position, setPosition] = useState({"econ": 0, "dipl": 0, "govt": 0, "scty": 0});
    const [submitted, setSubmitted] = useState({"trigger": false});

    useEffect(() => {
    }, [position])

    return (
        <div className="home">
            {/*
            possible that the error and pending handling needs to be OR instead of AND
            */}
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {questions && !submitted.trigger && <PoliticalTest 
                questions={questions} 
                position={position} 
                setSubmitted={setSubmitted}
            />}
            {submitted.trigger && <Results 
                totals={submitted.totals}
                answers={submitted.answers}
                setPosition={setPosition}
            />}
        </div>
    );
}
 
export default Home;