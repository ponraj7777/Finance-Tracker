import React from 'react'

function Statssearch({label,state,setState,placeholder}) {
  return (
    
        <input type="text" className='sinput' 
        value={state} onChange={(e)=>setState(e.target.value)}
        placeholder={placeholder}/>
    
  )
}

export default Statssearch