import * as firebase from "firebase/app";

 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBwkbY6w1B_qZG6f2N41X8niyHQPHwdzxs",
    authDomain: "login-otp-2408a.firebaseapp.com",
    databaseURL: "https://login-otp-2408a.firebaseio.com",
    projectId: "login-otp-2408a",
    storageBucket: "login-otp-2408a.appspot.com",
    messagingSenderId: "676191297100",
    appId: "1:676191297100:web:67bb541e99e6a31f4cdee9",
    measurementId: "G-G9086PYFXB"
  };
  // Initialize Firebase
 const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp;