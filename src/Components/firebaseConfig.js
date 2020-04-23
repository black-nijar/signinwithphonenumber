import * as firebase from "firebase/app";

 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  // Initialize Firebase
 const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp;
