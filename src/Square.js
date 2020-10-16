import React,{useState} from 'react';
import {Button} from '@material-ui/core';

function Square ({value, wordFunctions, visit}) {
    const [visited, setVisited] = useState(false);
    const color = "primary";
    const handleClick = (letter, wordFunctions, vistedFunctions) => {
        // if (!vistedFunctions[0]){ //if it was false
            let tempWord = wordFunctions[0]; //this is the current word
            tempWord += letter;
            wordFunctions[1](tempWord);
            // vistedFunctions[1](true);
            // setColor("secondary");
        // }  
        // else{
            // setColor("primary"); 
        // }
    }
    // if (visit === false){
    //      setVisited(visit);
    //      console.log("visited is ", visited);
    //     if (visited){
    //         setColor("secondary");
    //     }
    //     else{
    //         setColor("primary"); 
    //     }
    // }
   
    return <Button id="letter" onClick={() => handleClick(value, wordFunctions, [visited, setVisited])} size="large"color={color} variant="outlined"> {value} </Button>
}

export default Square;