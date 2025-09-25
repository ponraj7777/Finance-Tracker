import React from 'react'

function Custombtn({btncontent,blue,onClick, disabled}) {
  return (
    <button disabled={disabled} onClick={onClick} className={blue?"btn blue":"btn"}>
        {btncontent}
    </button>
  )
}

export default Custombtn