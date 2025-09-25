function Navbar({user,logout}){
    return(
        <nav>

            <h1 className="navbar">Finance-Tracker</h1>
            <div className="usericonlog">
                {user && (
                    (user.photoURL) ?(
                         <img className="usericon" src={user.photoURL} alt="User" />
                    ) : (
                    <i className="bi bi-person"></i>
                ))}
                
                {user&&<p className="logout" onClick={()=>logout()}>Logout</p>}
            </div>
            
        </nav>
    )
}

export default Navbar;