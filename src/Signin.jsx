import React from 'react'
import {useState} from 'react';
import Custombtn from './Custombtn';
import Custominput from './Custominput';
import {auth} from './firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import {toast} from 'react-toastify';
import { doc, setDoc,getDoc } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom';
function Signin({loginForm,setloginForm,googleAuth}) {
    const [loading,setLoading] = useState(false);
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const navigate = useNavigate();
    function signin(){
        console.log("Email",Email);
        console.log("Password",Password);
        
        if(Email!="" && Password!=""){
            setLoading(true);
            signInWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success("Logged in");
                console.log(user);
                setLoading(false);
                navigate("/dashboard");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
                setLoading(false);
            });
        }
        else{
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    }
    return (
        <div className="container">
    
        <form className="signupcontainer"action="" onSubmit={(e)=>e.preventDefault()}>
        <h3>Login on <span>Finance-tracker</span></h3>
    
        <Custominput type = "email" placeholder={"JohnDoe@gmail.com"}label={"Email"} state={Email} setState={setEmail}/>
        <Custominput  type = "password" placeholder={"Example123"}label={"Password"} state={Password} setState={setPassword}/>
        
        <Custombtn disabled = {loading}
        btncontent={loading?"Loading...":"Sign in With Email and Password"} blue={false} onClick={signin}/>
        <p>or</p>
        <Custombtn btncontent={"Sign in with Google"} blue={true} onClick={()=>googleAuth()}/>
        <p>Dont have an Account <span onClick={()=>{setloginForm(!loginForm)}}>Click here</span></p>
        </form>
        </div>
    )
}

export default Signin;