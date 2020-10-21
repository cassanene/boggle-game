import React from 'react';
import {Button} from '@material-ui/core';

function Square ({value, wordFunctions, letterFunctions}) {
    // console.log("letter functions in square:", letterFunctions);
    // const [visited, setVisited] = useState(false);
    const color = "primary";
    const handleClick = (letter, wordFunctions, letterFunctions) => {
        // if (!vistedFunctions[0]){ //if it was false
            let tempWord = wordFunctions[0]; //this is the current word
            tempWord += letter;
            letterFunctions[1](letter);
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
   
    return <Button id="letter" onClick={() => handleClick(value, wordFunctions, letterFunctions)} size="large"color={color} variant="outlined"> {value} </Button>
}

export default Square;