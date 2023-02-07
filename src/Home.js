import useFetch from "./utils/useFetch";
import PoliticalTest from "./PoliticalTest";
import Results from "./Results";
import { useState, useEffect } from "react";


const Home = () => {

    const { data: questions, isPending, error } = useFetch('http://localhost:8000/questions');
    const [position, setPosition] = useState([0,0,0,0]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        console.log(position);
    }, [position])

    return (
        <div className="home">
            {/*
            possible that the error and pending handling needs to be OR instead of AND
            */}
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {questions && !submitted && <PoliticalTest 
                questions={questions} 
                position={position} 
                setPosition={setPosition} 
                setSubmitted={setSubmitted}
            />}
            {submitted && <Results 
                position={position}
            />}
        </div>
    );
}
 
export default Home;