// import React from 'react'
// import Custommodalinput from './Custommodalinput'
// import {useState} from 'react';
// function Modal({modalid,title}) {
//     const [nameState,setName] = useState("");
//     const [amountState,setAmount] = useState("");
//     return (
//         <div className="modal">
//             <h3>{title}</h3>
//             <Custommodalinput label="Name" type="text" state={nameState} setState={setName}/>
//             <Custommodalinput label="Name" type="text" state={nameState} setState={setName}/>
//         </div>
//     )
// }

// export default Modal

import React, { useState } from 'react';
import Custommodalinput from './Custommodalinput';
import Custombtn from './Custombtn';

function Modal({ 
  modalid, title, closeModal, options=[],
  nameState,amountState,date,opt,
  setAmount,setDate,setName,setOpt,
  showmodals

}) {
  

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">
        <h3>{title}</h3>
        {console.log(options)}
        <Custommodalinput label="Name" type="text" state={nameState} setState={setName} />
        <Custommodalinput label="Amount" type="number" state={amountState} setState={setAmount} />
        <Custommodalinput label="Date" type="date" state={date} setState={setDate} />
        <Custommodalinput label="Tag" type="drop" state={opt} setState={setOpt} options = {options} />
        <div className="mbtns">
           
            <Custombtn btncontent="Close" onClick={closeModal} blue={false}/>
            <Custombtn btncontent="Add " blue={true} onClick={()=>showmodals()}/>
             
        </div>
        
        
      </div>
    </>
  );
}

export default Modal;
