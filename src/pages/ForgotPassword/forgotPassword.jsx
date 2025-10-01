import "./style.css"
import logo from '../../IMG/logo.png'
import { useState, useRef, useEffect } from "react";

export default function ForgotPassword() {
    const [submitted, setSubmitted] = useState(0);
    const [email, setEmail] = useState("");
    const [OTPval, setOTPval] = useState(Array(6).fill(""));

    const inputsRef = useRef([]);

    useEffect(() => {
        document.title = "Forgot Password";
      }, []);

    function submit(e){
        e.preventDefault(); // Prevent page reload
        if (!e.target.email.value.includes('@') || !e.target.email.value.includes('.com')) {
            return; // Stop further processing if invalid email
        }
        setSubmitted(submitted+1); // Move to next step when email is submitted
        setEmail(e.target.email.value); //Saves email for later use
    }

    function handleInput(e, index) {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) { // Only allows numbers
            e.target.value = "";
            return;
        }

        const newOTPval = [...OTPval];
        newOTPval[index] = val;
        setOTPval(newOTPval);
        const allFilled = newOTPval.every(v => v.length === 1);
        if (allFilled) {
            setSubmitted(2); // If every input is filled, move to next step
        }

        if (val !== "" && index < inputsRef.current.length - 1) { // Move to next input if current one is not empty
            inputsRef.current[index + 1].focus();
        }
    }
    function handleKeyUp(e, index) {
        const key = e.key.toLowerCase();
        if (key === "backspace" || key === "delete") {
            e.target.value = "";
            if (index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    }

    return (
        <div className="container1x3">
            <div className="top">
                <img src={logo} alt="logo"/>
            </div>
            <div className="center">
                {submitted===0 ? (
                    <>
                        <h1 id="fptitle">Forgot your password?</h1>
                        <p id="fptext">Enter your email address and we'll send you a code to reset your password.</p>
                        <form onSubmit={submit}>
                            <input type="text" id="emailIn" name="email"/>
                            <input type="submit" id="NextBtn" value="Next"/>
                        </form>
                    </>
                ) : submitted===1 ? (
                    <>
                        <h1 id="fptitle">Almost there!</h1>
                        <p id="fptext">Enter the 6-digit code sent to your email {email} for verification.</p>
                        <div className="container">
                            <div className="inputs">
                                {OTPval.map((value, i) => (<input key={i} type="text" maxLength={1} inputMode="numeric" id="OTP" className="input" ref={(el) => (inputsRef.current[i] = el)} onChange={(e) => handleInput(e, i)} onKeyUp={(e) => handleKeyUp(e, i)} />))}
                            </div>
                        </div>
                        <p id="fptext">Didn't receive a code?</p>
                        <button id="Code"> Request a new code</button>
                    </>
                ) : submitted===2 ? (
                    <>
                        <h1 id="fptitle">Change Password</h1>
                        <form style={{marginTop: 50}}>
                            <p id="fptext" style={{textAlign: "start"}}>New password</p>
                            <input type="text" id="emailIn" name="password" />
                            <p id="fptext" style={{textAlign: "start"}}>Confirm new password</p>
                            <input type="text" id="emailIn" name="confirm password" />
                        </form>
                        <button id="NextBtn">Login</button>
                    </>
                ) : null}
            </div>
        </div>
    );
}