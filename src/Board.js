import React from 'react';
import Grid from '@material-ui/core/Grid';
import Square from './Square'
import Box from '@material-ui/core/Box';


const grid = [
  [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
  [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
  [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
  [GetLetter(), GetLetter(), GetLetter(), GetLetter()],
];

function GetLetter(){
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let randnum = Math.floor(Math.random() * (26 - 0) ) + 0;
  let letter = alphabet[randnum];
  if (letter === "q"){
    letter = "qu";
  }
  return letter;
}

function Board(props){
  // console.log("visited in board:", props.visited);
      return (
        <div>
          <Box component="span" m={1} >
          <Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[0][0]} visit={props.visited} /> 
                <Square wordFunctions={props.variable} value={grid[0][1]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[0][2]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[0][3]} visit={props.visited} /> 
            </Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[1][0]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[1][1]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[1][2]} visit={props.visited} /> 
                <Square wordFunctions={props.variable} value={grid[1][3]} visit={props.visited} />
            </Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[2][0]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[2][1]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[2][2]} visit={props.visited} /> 
                <Square wordFunctions={props.variable} value={grid[2][3]} visit={props.visited} /> 
            </Grid>
            <Grid container item xs={4}>
                <Square wordFunctions={props.variable} value={grid[3][0]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[3][1]} visit={props.visited} /> 
                <Square wordFunctions={props.variable} value={grid[3][2]} visit={props.visited} />
                <Square wordFunctions={props.variable} value={grid[3][3]} visit={props.visited} />  
            </Grid>
          </Grid>
          </Box>
        </div>
      );
}

export default Board;
export {grid};
