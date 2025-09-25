import React from 'react'

function Custommodalinput({label,type,state,setState,options = []}) {
  return (
    <>
      {type != "drop" ?(
      <div className="minput-wrapper">
        <p>{label}</p>
        <input className = "minput"type={type} value = {state} onChange={(e)=>setState(e.target.value)} />
      </div>) :(
        <div>
        <p>{label}</p>
        <select 
        className='minput drop'
        value={state}
        onChange={(e)=>setState(e.target.value)}
        >
          <option value="" className='mopt'>--Select--</option>
          {
            options.map((opt,index)=>{
              console.log(opt);
              
              return(<option className="mopt"value={opt} key={index}>
                {opt}
                
              </option>);
            })
            
          }
        </select>
        </div>
      )
      }
    </>
    

  )
}

export default Custommodalinput