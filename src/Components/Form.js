import React, { useState, useEffect } from "react";
import firebaseApp from "./firebaseConfig";
import firebase from "firebase";

const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmResult, setConfirmResult] = useState("");
  const [verficationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState("");
  const [isSend, setIsSend] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible"
        // other options
      }
    );
  }, []);

  // Validation
  const validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(phoneNumber);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (validatePhoneNumber()) {
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(value => {
          // success
          setConfirmResult(value);
          setIsSend(true);
        })
        .catch(error => {
          // error
          alert("Error :", error);
        });
    } else {
      alert("Invalid Number");
    }
  };
  const handleVerifyCode = e => {
    e.preventDefault();
    if (verficationCode.length === 6) {
      confirmResult
        .confirm(verficationCode)
        .then(user => {
          setUserId(user.uid);
          alert(`Verified : ${userId}`);
        })
        .catch(error => {
          alert("Error :", error);
        });
    } else {
      alert("Please enter a 6 digit OTP code.");
    }
  };
  const onChangePhoneNumber = e => {
    e.preventDefault();
    setVerificationCode('');
    setConfirmResult(null);
    setIsSend(false);
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="welcome">Welcome</h2>
      {!isSend ? (
        <div>
          <label htmlFor="number">Enter mobile number :</label>
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
        </div>
      ) : null}
      {isSend ? (
        <div className="form">
          <label htmlFor="code">Enter verification Code :</label>
          <input
            type="number"
            placeholder="Enter six digit number"
            onChange={e => setVerificationCode(e.target.value)}
            className="form-control"
            required
          />
          <div className="btn-group">
            <div className="verify-code">
              <button
                className="btn btn-info"
                type="button"
                onClick={handleVerifyCode}
              >
                Verify Code
              </button>
            </div>
            <div className="back-button">
              <button
                className="btn btn-secondary"
                onClick={onChangePhoneNumber}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
};

export default Form;
