import React,{useState} from 'react';
import {Button} from '@material-ui/core';

function Square ({value, wordFunctions, visit}) {
    const [visited, setVisited] = useState(false);
    const color = "primary";
    const handleClick = (letter, wordFunctions, vistedFunctions) => {
        // if (!vistedFunctions[0]){ //if it was false
            console.log("word functions", wordFunctions);
            console.log("word 0 ", wordFunctions[0]);
            console.log("word 1 ", wordFunctions[1]);
            let tempWord = wordFunctions[0]; //this is the current word
            tempWord += letter;
            wordFunctions[1](tempWord);
            console.log("final word:", wordFunctions[0]);//this is the function to set the word
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