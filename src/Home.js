import useFetch from "./utils/useFetch";
import PoliticalTest from "./PoliticalTest";
import { useState, useEffect } from "react";

//ETH Denver 2023


const Home = (props) => {

    const { data: questions, isPending, error } = useFetch('http://localhost:8000/questions');
    const [submitted, setSubmitted] = useState({"trigger": false});

    useEffect(() => {
    }, [])

    return (
        <div className="home">
            {/*
            possible that the error and pending handling needs to be OR instead of AND
            */}
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {questions && <PoliticalTest
                walletAddress={props.walletAddress}
                status={props.status} 
                questions={questions} 
                setSubmitted={setSubmitted}
                submitted={submitted}
            />}
        </div>
    );
}
 
export default Home;