import React from "react";
import {Button} from '@material-ui/core';
import firebase from 'firebase';


function LoginButton ({setUser, user}) {
    function handleLogin () {
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider).then(function(result) {
          setUser(result.user);
        }).catch(function(error){
        });
      }
    //   function handleLogout () {
    //     // var provider = new firebase.auth.GoogleAuthProvider();
    
    //     firebase.auth().signOut().then(function() {
    //     //   console.log(result.user);
    //     //   setUser(result.user);
    //     }).catch(function(error){
    //       console.log("this is the error", error);
    //     });
    //   }
      
      if (user === null){
        return (
            <Button color="inherit" onClick={() => handleLogin()}>Login</Button>
          )
      } else {
        return (
            <Button color="inherit" >{user.displayName}</Button>
          ) 
      }

      
}
export default LoginButton;