import Navbar from "./Navbar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
function Header(){
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){

            navigate("/dashboard");
            console.log("user>>>",user.photoURL)
        }
    },[user,loading]);
    function logout(){
        try{
         
            signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            toast.success("Logged out Successfully");
            
            console.log(user);

            }).catch((error) => {
            // An error happened.
            toast.error(error.message);
            });
        }catch(e){
             toast.error(e.message);
        }
    }
    return(
        
        <div >
            
            <header ><Navbar user={user} logout={logout}/></header>
        </div>
    )
}
export default Header;