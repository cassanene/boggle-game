import React from 'react';
import {AppBar, Typography, Button, Toolbar} from '@material-ui/core';



function BoggleBar (){
  const handleClick = () => {
    window.location.reload(false);
  }
    return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6">
         Boggle Game
      </Typography>
      <Button color="inherit" onClick={() => handleClick()}>Start Over</Button>
      </Toolbar>
        </AppBar>
    )
}

export default BoggleBar;
