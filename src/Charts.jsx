import React from 'react'
import Linechart from './Linechart'
import Dompie from './Dompie'
import transsvg from './assets/transactions.svg';
function Charts({balancea,
  balance, income,
    expense, setIncome, setExpense,
    transactions
}) {
  return (
    <div className='charts'>
      
        {transactions.length > 0 ? (
          <><Linechart balancea={balancea}/>
        <Dompie income={income} expense={expense} balance={balance}/></>)
        : (<img className="default" src={transsvg}/>)}
    </div>
  )
}

export default Charts