import { useState, useEffect } from "react";
import useFetch from "./utils/useFetch";

/*
Old Push 

 const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const blog = { title, body, author };

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            history.push('/')
        })
    }

Old Delete

const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            console.log('blog deleted');
            history.push('/');
        })
    }

*/

const Results = (obj) => {

    const { data: ideologies, isPending, error } = useFetch('http://localhost:8000/ideologies');

    
    const [testFlag, setTestFlag] = useState(false); 

    const sortAndReduce = (arr) => {
        let arrSet = new Set(arr);
        let newArr = []
        arrSet.forEach((num) => {
            newArr.push(Number(num));
        });
        
        return newArr.sort(function(a,b){
            return a - b;
        });
    }

    const fourDimensionalDistance = (a, b) => {
        const a1 = a.econ, b1 = b.econ;
        const a2 = a.dipl, b2 = b.dipl;
        const a3 = a.govt, b3 = b.govt;
        const a4 = a.scty, b4 = b.scty;
        return Math.sqrt(Math.pow(a1 - b1, 2) + Math.pow(a2 - b2, 2) + Math.pow(a3 - b3, 2) + Math.pow(a4 - b4, 2));
    }

    const findClosestIdeology = (position, rubric) => {
        let closestArr = [];
        for (let i = 0; i < rubric.length; i++){
            closestArr.push({
                "category": rubric[i].category,
                "name": rubric[i].name,
                "quote": rubric[i].quote,
                "position": rubric[i].position,
                "distance": fourDimensionalDistance(position, rubric[i].position)
            });
        }
        let closestArrSorted = closestArr.sort((a, b) => {
            return a.distance - b.distance;
        });
        return closestArrSorted;

        //TODO: Limit to 3 closest ideologies
        //TODO: If there is a tie, return all of them
    }


    useEffect(() => {
        if(ideologies){
            console.log(obj);
            let userPosition = {
                "econ": obj.answers.econ/obj.totals.econ,
                "dipl": obj.answers.dipl/obj.totals.dipl,
                "govt": obj.answers.govt/obj.totals.govt,
                "scty": obj.answers.scty/obj.totals.scty
            }
            console.log(userPosition);
            const matches = findClosestIdeology(userPosition, ideologies);
            let testMatch = findClosestIdeology({econ: 0.8461538461538461, dipl: 0.6888888888888889, govt: 0.6640625, scty: 0.8544520547945206}, ideologies);
            console.log(testMatch);
            console.log(matches);
        }
    }, [testFlag])
    
    
    
    return (
        <div className="results">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {!error && !isPending && <div className="testResults">
                <h1>Test Results</h1>
            </div>}
            {<button className="refreshButton" onClick={() => testFlag ? setTestFlag(false): setTestFlag(true)}>Refresh</button>} <br/>
        </div>
    );
}
 
export default Results;