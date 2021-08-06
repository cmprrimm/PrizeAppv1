import * as firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyAUQot35rb03GCgVCl2JZf-b2nzIDg1C0Q",
    authDomain: "prizeapp-eda7c.firebaseapp.com",
    databaseURL: "https://prizeapp-eda7c-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "prizeapp-eda7c",
    storageBucket: "prizeapp-eda7c.appspot.com",
    messagingSenderId: "475084867014",
    appId: "1:475084867014:web:e65db6210f02b621f55ec7",
    measurementId: "G-81TQ7QVM37"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;