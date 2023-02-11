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



    function findMean(arr) {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }
    
    function findMode(arr) {
        let modeMap = {};
        let maxCount = 0;
        let modes = [];
      
        arr.forEach((val) => {
          if (!modeMap[val]) modeMap[val] = 1;
          else modeMap[val]++;
      
          if (modeMap[val] > maxCount) {
            modes = [val];
            maxCount = modeMap[val];
          } else if (modeMap[val] === maxCount) {
            modes.push(val);
            maxCount = modeMap[val];
          }
        });
      
        if (modes.length === Object.keys(modeMap).length) modes = [];
      
        return modes;
    }
    
    function findStdDev(arr) {
        let meanValue = findMean(arr);
        let deviationSquaredArr = arr.map((val) => (val - meanValue) ** 2);
        let meanDeviationSquared = findMean(deviationSquaredArr);
        return Math.sqrt(meanDeviationSquared);
    }  

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
                "name": rubric[i].name,
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
    
    const createNewDataStructure = (ideologiesObj) => {
        let newObj = {"ideologies": {"econ": []}};
        let ideologicalRubric = [];
        for (let i = 0; i < 4; i++){
            newObj.ideologies.econ.push({"min": 25*i, "max": 25*(i+1), "dipl":[]});
            for (let j = 0; j < 4; j++){
                newObj.ideologies.econ[i].dipl.push({"min": 25*j, "max": 25*(j+1), "govt":[]});
                for (let k = 0; k < 4; k++){
                    newObj.ideologies.econ[i].dipl[j].govt.push({"min": 25*k, "max": 25*(k+1), "scty":[]});
                    for (let l = 0; l < 4; l++){
                        newObj.ideologies.econ[i].dipl[j].govt[k].scty.push({"min": 25*l, "max": 25*(l+1), "category":null});
                    }
                }
            } 
        }

        console.log(ideologiesObj);
        console.log(moreIdeologiesObj);

        for (let i = 0; i < ideologiesObj.length; i++){
            let econ = ideologiesObj[i].position.econ;
            let dipl = ideologiesObj[i].position.dipl;
            let govt = ideologiesObj[i].position.govt;
            let scty = ideologiesObj[i].position.scty;
            let category = ideologiesObj[i].name;
            for (let j = 0; j < newObj.ideologies.econ.length; j++){
                if (econ >= newObj.ideologies.econ[j].min && econ <= newObj.ideologies.econ[j].max){
                    for (let k = 0; k < newObj.ideologies.econ[j].dipl.length; k++){
                        if (dipl >= newObj.ideologies.econ[j].dipl[k].min && dipl <= newObj.ideologies.econ[j].dipl[k].max){
                            for (let l = 0; l < newObj.ideologies.econ[j].dipl[k].govt.length; l++){
                                if (govt >= newObj.ideologies.econ[j].dipl[k].govt[l].min && govt <= newObj.ideologies.econ[j].dipl[k].govt[l].max){
                                    for (let m = 0; m < newObj.ideologies.econ[j].dipl[k].govt[l].scty.length; m++){
                                        if (scty >= newObj.ideologies.econ[j].dipl[k].govt[l].scty[m].min && scty <= newObj.ideologies.econ[j].dipl[k].govt[l].scty[m].max){
                                            ideologicalRubric.push({
                                                "name": category,
                                                "position": {
                                                    "econ": (newObj.ideologies.econ[j].min + newObj.ideologies.econ[j].max + econ)/3,
                                                    "dipl": (newObj.ideologies.econ[j].dipl[k].min + newObj.ideologies.econ[j].dipl[k].max + dipl)/3,
                                                    "govt": (newObj.ideologies.econ[j].dipl[k].govt[l].min + newObj.ideologies.econ[j].dipl[k].govt[l].max + govt)/3,
                                                    "scty": (newObj.ideologies.econ[j].dipl[k].govt[l].scty[m].min + newObj.ideologies.econ[j].dipl[k].govt[l].scty[m].max + scty)/3
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {newObj, ideologicalRubric};
    }

    const mapIdeologies = (semimappedideologiesObj, IdeologicalRubric) => {
        
        console.log(semimappedideologiesObj);
        let distanceArr = [];
        let minDistanceArr = [];

        for (let j = 0; j < semimappedideologiesObj.ideologies.econ.length; j++){
            for (let k = 0; k < semimappedideologiesObj.ideologies.econ[j].dipl.length; k++){
                for (let l = 0; l < semimappedideologiesObj.ideologies.econ[j].dipl[k].govt.length; l++){
                    for (let m = 0; m < semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty.length; m++){
                        if(!semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category){
                            semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category = findClosestIdeology({
                                "econ": (semimappedideologiesObj.ideologies.econ[j].min + semimappedideologiesObj.ideologies.econ[j].max)/2,
                                "dipl": (semimappedideologiesObj.ideologies.econ[j].dipl[k].min + semimappedideologiesObj.ideologies.econ[j].dipl[k].max)/2,
                                "govt": (semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].min + semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].max)/2,
                                "scty": (semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].min + semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].max)/2
                            }, IdeologicalRubric);
                            for(let i = 0; i < semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category.length; i++){
                               distanceArr.push(semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category[i].distance);
                            }
                            minDistanceArr.push(semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category[0].distance)
                        }
        
                    }
                }
            }
        }

        
        let mode = findMode(distanceArr);
        let rawMean = findMean(distanceArr);
        let rawStdDev = findStdDev(distanceArr);
        let newdistanceArr = sortAndReduce(distanceArr);
        let newMean = findMean(newdistanceArr);
        let newStdDev = findStdDev(newdistanceArr);
        let newMinDistanceArr = sortAndReduce(minDistanceArr);
        console.log(`mode: ${mode}, rawMean: ${rawMean}, rawStdDev: ${rawStdDev}, newMean: ${newMean}, newStdDev: ${newStdDev}`);
        let minDistancMean = findMean(newMinDistanceArr);
        let minDistancStdDev = findStdDev(newMinDistanceArr);
        console.log(`minDistancMean: ${minDistancMean}, minDistancStdDev: ${minDistancStdDev}`);

        let offendingPositions = [];
        let cutoff = minDistancMean +  minDistancStdDev;

        for (let j = 0; j < semimappedideologiesObj.ideologies.econ.length; j++){
            for (let k = 0; k < semimappedideologiesObj.ideologies.econ[j].dipl.length; k++){
                for (let l = 0; l < semimappedideologiesObj.ideologies.econ[j].dipl[k].govt.length; l++){
                    for (let m = 0; m < semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty.length; m++){
                        if(semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category[0].distance > cutoff){
                            offendingPositions.push({
                                "position": {
                                    "econ": (semimappedideologiesObj.ideologies.econ[j].min + semimappedideologiesObj.ideologies.econ[j].max)/2,
                                    "dipl": (semimappedideologiesObj.ideologies.econ[j].dipl[k].min + semimappedideologiesObj.ideologies.econ[j].dipl[k].max)/2,
                                    "govt": (semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].min + semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].max)/2,
                                    "scty": (semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].min + semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].max)/2
                                },
                                "closestMatch": semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category[0].name,
                                "distance": semimappedideologiesObj.ideologies.econ[j].dipl[k].govt[l].scty[m].category[0].distance
                            });
                        }
                    }
                }
            }
        }
        console.log(offendingPositions);




        
        return semimappedideologiesObj;
    }



        

    useEffect(() => {
        if(ideologies){
            let {newObj, ideologicalRubric} =  createNewDataStructure(ideologies);
            let finalObj = mapIdeologies(newObj, ideologicalRubric);
            console.log(finalObj);
        }
    }, [testFlag])
    
    
    
    return (
        <div className="results">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {!error && !isPending && <div className="testResults">
                <h1>Test Results</h1>
            </div>}
            {<button className="refreshButton" onClick={() => testFlag ? setTestFlag(false): setTestFlag(true)}>Refresh</button>}
        </div>
    );
}
 
export default Results;