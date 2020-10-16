import React,{useState} from 'react';
import './App.css';
import Board from './Board';
import {Container,Button,TableContainer, Table, TableHead, TableCell, TableRow, TableBody} from '@material-ui/core';
import {findAllSolutions} from './boggle_solver'
import {grid} from './Board'
import data from './full-wordlist.json'
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import BoggleBar from './BoggleBar';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const [started, setStarted] = useState("");
  const [word, setWord] = useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState("");
  const [foundArray, setFound] = useState([]);
  const [visited, setVisited] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
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
        // setVisited(false);
        const index = notFoundArray.indexOf(tempWord); //get the index of the 
        if (index > -1){
          // console.log("in the splicer");
          notFoundArray.splice(index,1)
          setNotFound(notFoundArray);
        }
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
      // console.log("visited in else submit:", visited);
    }
  }

  let dictionaryWords = data.words;
  let solutions = findAllSolutions(grid, dictionaryWords);
  // console.log(solutions);
  const [notFoundArray, setNotFound] = useState(solutions);
  if (started === "start"){
    return (
      <div> 
      <BoggleBar />
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'center'}}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Container maxWidth="lg">
      <Board variable={[word,setWord]} visited={visited}/>    
      <Button onClick={() => handleStop()}> 
        End Game
      </Button>
      <Button onClick={() => handleSubmit()}> 
        Submit {word}
      </Button>
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
        <Button onClick={() => handleClick()}> 
        Start
      </Button>
      </div>
    );
  }
}
export default App;
