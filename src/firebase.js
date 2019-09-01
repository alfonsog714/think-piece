import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB1oaPFdF3ojgMdqcUUbKMJnmRU3ifXOeY",
    authDomain: "think-piece-9eab6.firebaseapp.com",
    databaseURL: "https://think-piece-9eab6.firebaseio.com",
    projectId: "think-piece-9eab6",
    storageBucket: "",
    messagingSenderId: "979471950747",
    appId: "1:979471950747:web:b26f3c07ca243224"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });
// attaches firebase stuff to the window, allowing us to do firebase related stuff in the console. Remove in production.
window.firebase = firebase;

export default firebase;
