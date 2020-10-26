import React,{useState} from 'react';
import './App.css';
import Board from './Board';
import {Container,Button,TableContainer, Table, TableHead, TableCell, TableRow, TableBody} from '@material-ui/core';
import {findAllSolutions} from './boggle_solver';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import {dictionaryWords, GRID_SIZE} from './constants';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import BoggleBar from './BoggleBar';
import RandomGrid from './randomGen.js';
import FirebaseData from './test.firestore.js'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


// const solutions = findAllSolutions(grid, dictionaryWords);

function App() {
  const [started, setStarted] = useState("");
  const [word, setWord] = useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState("");
  const [foundArray, setFound] = useState([]);
  const [visited, setVisited] = useState(false);
  const [letter, setLetter] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [gridvar, setGrid] = useState([]);
  const [notFoundArray, setNotFound] = useState([]);
  const classes = useStyles();

  
  const handleClick = () => {
    //for some reason i cannot access the grid and the solutions in here
    var tempGrid = RandomGrid(GRID_SIZE);
    console.log("this is temp Grid", tempGrid);
    setGrid(tempGrid);
    console.log("this is grid", gridvar);
    var tempSolutions = findAllSolutions(tempGrid, dictionaryWords);
    setSolutions(tempSolutions);
    setNotFound([...tempSolutions]);
    console.log("these are the solutions", solutions);
    setStarted("start");
  };
  const handleStop = () => {
    setStarted("stop");
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleDelete = () => {
    if (letter === ""){
      setMessage("You can't delete anything!");
      setSeverity("error");
      setOpen(true);
    } else if (word.length === 1){
      setWord("");
      setLetter("");
    } else{
      //slice the last letter in the word
      let tempWord = word.slice(0,-1);
      setWord(tempWord);
      let lastLetter = tempWord[tempWord.length-1];
      setLetter(lastLetter);
    }
  }
  const handleSubmit = () => {
    let tempWord = word;
    setWord("");  // reset the word to empty string
    if (solutions.includes(tempWord)){ //the guess is a solution
      if (foundArray.includes(tempWord)){ // if you already found it
        setMessage("You already found " + tempWord);
        setSeverity("warning");
        setOpen(true);
      }
      else{ // if you havent found it yet
        setFound(foundArray => foundArray.concat(tempWord));
        setMessage(tempWord + " is a word");
        setSeverity("success");
        setOpen(true);
        const index = notFoundArray.indexOf(tempWord); //get the index of the word
        notFoundArray.splice(index,1);
        setNotFound(notFoundArray);
      } 
    }
    else if (tempWord === ""){
      setMessage("You cannot submit an empty word");
      setSeverity("info");
      setOpen(true);
    }
    else if (tempWord.length < 3){
      setMessage("Word has to be more than 3 letters");
      setSeverity("info");
      setOpen(true);
    }
    else{
      setMessage(tempWord + " is  not a word");
      setSeverity("error");
      setOpen(true);
      setVisited(false);
    }
    setLetter("");
  }

  const handleChallenge = async (challenge) => {
    var tempGrid = await FirebaseData(challenge);
    setGrid(tempGrid);
    var tempSolutions = findAllSolutions(tempGrid, dictionaryWords);
    setSolutions(tempSolutions);
    setNotFound([...tempSolutions]);
    setStarted("start")
  }

  if (started === "start"){
    console.log("this is the grid", gridvar);
    console.log("these are the solutions", solutions);
    return (
      <div> 
      <BoggleBar />
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'center'}}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
        <Container maxWidth="lg" >
      <Board variable={[word,setWord]} visited={visited} grid={gridvar} letter={[letter,setLetter]} /> 
      <div>
      <Button variant="outlined" color="secondary" onClick={() => handleSubmit()}> 
        Submit {word}
      </Button>
      </div>  
      <div>
      <Button variant="outlined" onClick={() => handleDelete()}> 
        Delete {letter}
      </Button> 
      </div>
      <div>
      <Button variant="outlined" onClick={() => handleStop()}> 
        End Game
      </Button> 
        </div> 
      </Container>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
           <TableRow>
             <TableCell>
               Found Words
             </TableCell>
           </TableRow>
          </TableHead>
          <TableBody>
            {foundArray.map((row) => (
              <TableRow>
                <TableCell>
                  {row}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div> 
    );
  }
  else if (started === "stop"){
    return(
      <div>
        <BoggleBar />
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
           <TableRow>
             <TableCell>
               You Missed {notFoundArray.length} Words
             </TableCell>
           </TableRow>
          </TableHead>
          <TableBody>
            {notFoundArray.map((row) => (
              <TableRow>
                <TableCell>
                  {row}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
  } else {
    return (
      <div> 
      <BoggleBar />
      <Box textAlign='center' >
      <Select placeholder="Load Challenge" >
          <MenuItem onClick={() => handleChallenge("grid1")} >Challenge 1</MenuItem>
          {/* <MenuItem onClick={() => handleChallenge()} >Option2</MenuItem> */}
          {/* <MenuItem onClick={() => handleChallenge()} > value={30}>Option3</MenuItem> */}
          </Select>
        <Button onClick={() => handleClick()}> 
        Start
      </Button>
      </Box> 
      </div>
    );
  }
}
export default App;
