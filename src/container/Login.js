import React, { useRef, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./Login.css";

const Login = () => {
  const [code, setCode] = useState("");
  const [number, setNumber] = useState("");
  const formRef = useRef();
  const containerRef = useRef();

  const handlePhoneNoLogin = (e) => {
    e.preventDefault();
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha", { size: "visible" });
    let phoneNumber = `${code}${number}`;

    if (phoneNumber) {
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, recaptcha)
        .then((res) => {
          let code = prompt("Please Enter the OTP: ");
          if (code == null) return;
          res
            .confirm(code)
            .then((authUser) => {
              const username = prompt("Enter Username: ");
              return authUser.user.updateProfile({
                displayName: username,
              });
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Please Enter Phone Number");
    }
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => res)
      .catch((err) => alert(err.message));
  };

  const signInWithPhone = () => {
    formRef.current.style.display = "flex";
    containerRef.current.style.display = "none";
  };

  const cancelPhoneSignIn = () => {
    containerRef.current.style.display = "flex";
    formRef.current.style.display = "none";
  };

  return (
    <div className="login" id="login">
      <div ref={containerRef} className="login__container">
        
        <button onClick={signInWithGoogle} className="login__googleBtn">
          <span>Sign in with Google</span>
        </button>
        
      </div>
      
    </div>
  );
};

export default Login;
