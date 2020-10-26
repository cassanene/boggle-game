import {firebaseApp} from './firebase.js';
import firebase from 'firebase';




const app = firebaseApp;
const db = firebase.firestore(app);

async function FirebaseData(challenge){
    // now async 
    let newGrid = [];
    
    var docRef = db.collection("grids").doc(challenge);

    let grid = await docRef.get().then(function(doc) { // .get returns a promise -> give it a function that doesnt execute right awat it doesnt execute right away
        // awaiting the promise , .then() chaining a promising onto it, executes our function, 
        if (doc.exists) {
            const a = Object.keys(doc.data()).map(i => doc.data()[i]);
            var x = 0;
            for (x = 0; x < a.length; x++){
                const b = Object.values(a[x]); // get the letters in array form
                newGrid.push(b); //put them into the new grid
            }
            console.log("newGrid", newGrid);
            return newGrid;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
return grid;    
    
}

export default FirebaseData;
// Initialize Cloud Firestore through Firebase


function MakeData(){
    // Add a new document in collection "grid"
    db.collection("grids").doc("grid1").set({
        0: {
            0: "t",
            1: "w",
            2: "y",
            3: "r"
        },
        1: {
            0: "e",
            1: "n",
            2: "p",
            3: "h"
        },
        2: {
            0: "g",
            1: "z",
            2: "qu",
            3: "r"
        },
        3: {
            0: "o",
            1: "n",
            2: "t",
            3: "a"
        }
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    })


}

// MakeData();
// Document data: T
// Document data: [
//     { '0': 'T', '1': 'W', '2': 'Y', '3': 'R' }, -0
//     { '0': 'E', '1': 'N', '2': 'P', '3': 'H' }, -1
//     { '0': 'G', '1': 'Z', '2': 'Qu', '3': 'R' }, -2
//     { '0': 'O', '1': 'N', '2': 'T', '3': 'A' } -3
//   ]
  

// firebase.database().ref('grid1').once('value', (snapshot) => {
//     console.log(snapshot.val())
// })



