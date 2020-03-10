import React, { useState, useEffect } from "react";
import firebaseApp from "./firebaseConfig";
import firebase from "firebase";

const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmResult, setConfirmResult] = useState("");
  console.log("RECAP :", confirmResult);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible"
        // other options
      }
    );
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    console.log("CLICKED", phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmResult => {
        // success
      })
      .catch(error => {
        // error
      });
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="welcome">Welcome</h2>
      <label htmlFor="number">Enter mobile number</label>
      <input
        //  id="recaptcha-container"
        className="form-control"
        type="text"
        placeholder="Enter phone number with country code"
        onChange={e => setPhoneNumber(e.target.value)}
        required
      />
      <div className="send-button">
        <button
          className="btn btn-primary"
          type="submit"
          id="recaptcha-container"
        >
          Send code
        </button>
      </div>
    </form>
  );
};

export default Form;
