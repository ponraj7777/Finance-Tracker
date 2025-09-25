import App from "./App"
import Custominput from "./Custominput"
import Custombtn from "./Custombtn";
import {useState} from 'react';
import { auth,provider } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import {db} from './firebase'
import Signin from "./Signin";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Signup() {
  const [Name,setName] = useState("");
  const [Email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  const [Cpassword,setCpassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [loginForm,setloginForm] = useState(false);
  const navigate = useNavigate();
  async function createdoc(user){
    console.log("A");
    if(!user) return;
    console.log("B");
    const userRef = doc(db,"users",user.uid);
    const userData = await getDoc(userRef)
    if(!userData.exists()){
      try{
          await setDoc(doc(db,"users",user.uid),{
          name:user.displayName?user.displayName:Name,
          email:user.email,
          photoURL:user.photoURL?user.photoURL:null,
          createAt:new Date()
          });
          toast.success("Doc created");
      }
      catch(e){
        toast.error(e.message); 
      }
    }
    else{
      toast.error("Doc already exist");
    }
  }
  function googleAuth(){
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        toast.success("Logged-in")
        createdoc(user);
        navigate("/dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
    }
    catch(e){
      toast.error(e.message);
    }
  }
  function signupwithemail(){
    console.log(Name);
    console.log(Email);
    console.log(Password);
    console.log(Cpassword);
    if(Name!="" && Email!="" && Password!="" && Cpassword!=""){
      if(Password.length>=8 && Cpassword.length>=8){
        if(Password == Cpassword){
          setLoading(true);
          createUserWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              console.log(user);
              toast.success("User Created!");
              setLoading(false);
              createdoc(user);
              navigate("/dashboard");
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              setLoading(false);
              toast.error(errorMessage);
            });
          
        }
        else{
          toast.error("Password and Confirm Password should match");
          setLoading(false);
        }
      }
      else{
        toast.error("Password length should be greater than 8");
        setLoading(false);
      }

    }
    else{
      toast.error("All fields are required");
      setLoading(false);
    }
  }
  
  return (
    <>
    
    { !loginForm ? (
    <div>
      <div><App/></div>
      <div className="container">
    
        <form className="signupcontainer"action="" onSubmit={(e)=>e.preventDefault()}>
        <h3>Sign Up on <span>Finance-tracker</span></h3>
        <Custominput placeholder={"John Doe"}label={"Full Name"} state={Name} setState={setName}/>
        <Custominput type = "email" placeholder={"JohnDoe@gmail.com"}label={"Email"} state={Email} setState={setEmail}/>
        <Custominput  type = "password" placeholder={"Example123"}label={"Password"} state={Password} setState={setPassword}/>
        <Custominput type = "password" placeholder={"Example123"}label={"Confirm Password"} state={Cpassword} setState={setCpassword}/>
        <Custombtn disabled = {loading}
        btncontent={loading?"Loading...":"Sign Up with Email and Password"} blue={false} onClick={signupwithemail}/>
        <p>or</p>
        <Custombtn btncontent={"Sign Up with Google"} blue={true} onClick={()=>googleAuth()}/>
        <p>Already have an account <span onClick={()=>setloginForm(!loginForm)}>Click here</span></p>
        </form>
      </div>
    </div>):
    <div>
      <div><App/></div>
    <Signin loginForm={loginForm} setloginForm={setloginForm} googleAuth = {googleAuth}/>
    </div>
    }
    
   
    </>
  
  )
}

export default Signup