function Custominput({type, label,state,setState,placeholder}){
    return(<>
        <div className="input-wrapper">
            <p className="custom-label">{label}</p>
            <input type={type} placeholder={placeholder} className="custom-input" value={state} onChange={(e)=>{setState(e.target.value)}} />
            
        </div>
    </>)
}

export default Custominput;