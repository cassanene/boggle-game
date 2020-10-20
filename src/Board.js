import React from 'react';
import Grid from '@material-ui/core/Grid';
import Square from './Square'
import Box from '@material-ui/core/Box';
import RandomGrid from './randomGen.js';


// const grid = [
//   [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
//   [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
//   [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
//   [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
// ];

const GRID_SIZE = 4;

const grid = RandomGrid(GRID_SIZE);

// function GetLetter(){
//   let alphabet = "abcdefghijklmnopqrstuvwxyz";
//   let randnum = Math.floor(Math.random() * (26 - 0) ) + 0;
//   let letter = alphabet[randnum];
//   if (letter === "q"){
//     letter = "qu";
//   }
//   return letter;
// }

function Board(props){
  console.log("letters in board:", props.letter);
      return (
        <div>
          <Box component="span" m={1} >
          <Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[0][0]} visit={props.visited} letterFunctions={props.letter} /> 
                <Square wordFunctions={props.variable} value={grid[0][1]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[0][2]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[0][3]} visit={props.visited} letterFunctions={props.letter} /> 
            </Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[1][0]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[1][1]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[1][2]} visit={props.visited} letterFunctions={props.letter} /> 
                <Square wordFunctions={props.variable} value={grid[1][3]} visit={props.visited} letterFunctions={props.letter} />
            </Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[2][0]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[2][1]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[2][2]} visit={props.visited} letterFunctions={props.letter} /> 
                <Square wordFunctions={props.variable} value={grid[2][3]} visit={props.visited} letterFunctions={props.letter} /> 
            </Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[3][0]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[3][1]} visit={props.visited} letterFunctions={props.letter} /> 
                <Square wordFunctions={props.variable} value={grid[3][2]} visit={props.visited} letterFunctions={props.letter} />
                <Square wordFunctions={props.variable} value={grid[3][3]} visit={props.visited} letterFunctions={props.letter} />  
            </Grid>
          </Grid>
          </Box>
        </div>
      );
}

export default Board;
export {grid};
