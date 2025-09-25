import React from 'react'
import App from './App';
import Cards from './Cards';
import Stats from './Stats';
import Statefilter from './Statefilter';
import { useState } from 'react';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, getDocs, query } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import Charts from './Charts';
function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);
  const [balance,setBalance] = useState(0);
  const [balancea,setBalancea] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  async function addTransaction(transaction,many) {
        if(!user) {
            toast.error("No active user. Please log in.");
            return;
        }
        try {
            await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
            if(!many){
            toast.success("Transaction added");
            }
        } catch(e) {
            toast.error(e.message);
        }
  }
  return (
    <>
    <div className="dash">
    <App />
    <Cards transactions={transactions} setTransactions={setTransactions}
    addTransaction={addTransaction} balance={balance} setBalance={setBalance}
    balancea={balancea} setBalancea={setBalancea}
    income={income}
    expense={expense} setIncome={setIncome} setExpense = {setExpense}/>
    <Charts balancea={balancea} balance={balance} income={income}
    expense={expense} setIncome={setIncome} setExpense = {setExpense}
    transactions={transactions}/>
    <Stats className="stats" transactions={transactions} setTransactions={setTransactions} 
    addTransaction={addTransaction}/>
    </div>
    </>
    
  )
}

export default Dashboard