import React, {useState} from 'react';
import {AppBar, Typography, Button, Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from './LoginButton';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mButton: {
    marginRight: theme.spacing(115),
  },
  title: {
    flexGrow: 1,
  },
}));

function BoggleBar (){
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const handleClick = () => {
    window.location.reload(false);
  }
  //
    return (
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.mButton} >
           Boggle Game
        </Typography>
        <Button color="inherit" onClick={() => handleClick()}>Start Over</Button>
        <LoginButton setUser={setUser} user={user} />
        </Toolbar>
          </AppBar>
      ) 
      //
 }
export default BoggleBar;
