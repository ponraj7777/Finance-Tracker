import React from 'react'

function Statefilter({label,type,state,setState,options = []}) {
  return (
   
       
        <select 
        className='sinput drop'
        value={state}
        onChange={(e)=>setState(e.target.value)}
        >
          
          {
            options.map((opt,index)=>{
              console.log(opt);
              
              return(<option className="mopt" value={opt} key={index}>
                {opt}
              </option>);
            })
            
          }
        </select>
    
   
  )
}

export default Statefilter



