import { useState, useEffect } from "react";

/*
Old Push 

    https://cdn.discordapp.com/attachments/1064440128518504509/1074220530359611433/BeauTroxclair.eth_full_body_cute_squirrel_in_16_bit_pixel_art_s_6bd04c61-a692-485b-b02d-f2e40a204629.png

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
    
    const [testFlag, setTestFlag] = useState(false); 


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
    }


    useEffect(() => {
        if(obj.ideologies){
            console.log(obj);
            let userPosition = {
                "econ": obj.answers.econ/obj.totals.econ,
                "dipl": obj.answers.dipl/obj.totals.dipl,
                "govt": obj.answers.govt/obj.totals.govt,
                "scty": obj.answers.scty/obj.totals.scty
            }
            console.log(userPosition);
            const matches = findClosestIdeology(userPosition, obj.ideologies);
            console.log(matches);
        }
    }, [testFlag])
    
    
    
    return (
        <div className="results">
            <div className="testResults">
                <h1>Test Results</h1>
            </div>
            {<button className="refreshButton" onClick={() => testFlag ? setTestFlag(false): setTestFlag(true)}>Refresh</button>} <br/>
        </div>
    );
}
 
export default Results;