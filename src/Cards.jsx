


// import React, { useState } from 'react';
// import Custombtn from './Custombtn';
// import Modal from './Modal';
// import { collection, addDoc } from "firebase/firestore"; 
// import { toast } from "react-toastify";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth,db } from './firebase';
// import {useEffect} from 'react';
// import {  query, where, getDocs } from "firebase/firestore";

// function Cards() {
//     const [activeModal, setActiveModal] = useState(null);
//     const [nameState, setName] = useState("");
//     const [amountState, setAmount] = useState("");
//     const [date,setDate] = useState("");
//     const [opt,setOpt] = useState("");
//     const [user,loading] = useAuthState(auth);
//     const openModal = (id) => setActiveModal(id);
//     const closeModal = () => setActiveModal(null);
//     const option1 = ["abcd","efgh","ijkl"];
//     const option2 = ["Salary","Freelance","Investment"];
//     const option3 = ["Food","Education","Office"];
//     const [income,setIncome] = useState(0);
//     const [expense,setExpense] = useState(0);
//     const [balance,setBalance] = useState(0);
//     const [transactions,setTransaction] = useState([]);
//     useEffect(() => {
//         if (!user) {
//         setActiveModal(null);
//         }
//     }, [user]);

//     useEffect(()=>{
//         if(user){
//         fetchTransactions();
//         }
       
//     },[user]);
//     useEffect(()=>{
//         if(user){
//         calculatebalance();
//         }
//     },[transactions])
//     function calculatebalance(){
//         let totalincome = 0;
//         let totalexpense = 0;
//         transactions.forEach((trans)=>{
//             if(trans.type ==="income"){
//                 totalincome+=Number(trans.amount);
//             }
//             else if(trans.type === "expense"){
//                 totalexpense+=Number(trans.amount);
//             }
//             else{

//             }
//         });
//         setIncome(totalincome);
//         setExpense(totalexpense);
//     }


//     async function fetchTransactions() {
//         const currentUser = auth.currentUser;
      
//         try{
//         const q = query(collection(db, `users/${currentUser.uid}/transactions`));
//         const querySnapshot = await getDocs(q);
//         let trans = [];
//         querySnapshot.forEach((doc) => {
//             trans.push(doc.data());
//             console.log(doc.data());
//         });
//         setTransaction(trans);
//         }
//         catch(e){
//             console.log(e.message);
//         }
    
//     }
//     function showmodals(){
//         console.log(nameState);
//         console.log(amountState);
//         console.log(date);
//         console.log("p=sa",opt);
//         closeModal();
//         const newTransaction = {
//             type : activeModal == "modal2"?"income":"expense",
//             name:nameState,
//             amount:amountState,
//             date:date,
//             tag:opt
//         }
//         addTransaction(newTransaction);
//         calculatebalance();
//         setName("");
//         setAmount("");
//         setDate("");
//         setOpt("");
        
//     }
//     async function addTransaction(transaction){
        
//         const currentUser = auth.currentUser;
//         console.log(currentUser.displayName);
//           if (!auth.currentUser) {
//       toast.error("No active user. Please log in.");
//       return;
//     }
//         try{
//             const docRef = await addDoc(collection(db, `users/${currentUser.uid}/transactions`),transaction);
//             console.log("Document written with ID: ", docRef.id);
//             toast.success("Transaction added");
//             let newArr = transactions;
//             newArr.push(transaction);
//             setTransaction(newArr);
//         }
//         catch(e){
//             toast.error(e.message);
//         }
//     }
//     return (
//         <div className="cards">
   
//         <div className="card" onClick={() => openModal("modal1")}>
//             <p>Current Balance</p>
//             <p>${income-expense}</p>
//             <Custombtn btncontent="Reset Balance" blue={true} />
//         </div>


//         <div className="card" onClick={() => openModal("modal2")}>
//             <p>Total Income</p>
//             <p>${income}</p>
//             <Custombtn btncontent="Add Income" blue={true} />
//         </div>

    
//         <div className="card" onClick={() => openModal("modal3")}>
//             <p>Total Expenses</p>
//             <p>${expense}</p>
//             <Custombtn btncontent="Add Expense" blue={true} />
//         </div>

        
//         {
//         activeModal && (
//             <Modal
//             modalid={activeModal}
//             title={
//                 activeModal === "modal1"
//                 ? "Reset Balance"
//                 : activeModal === "modal2"
//                 ? "Add Income"
//                 : "Add Expense"
//             }
//             closeModal={closeModal}
//             options={
//                 activeModal === "modal1"?option1:
//                 activeModal === "modal2"?option2:
//                 option3
//             }
//             nameState = {nameState}
//             amountState = {amountState}
//             date = {date}
//             opt = {opt}
//             setName = {setName}
//             setDate = {setDate}
//             setAmount = {setAmount}
//             setOpt = {setOpt}
//             showmodals = {showmodals}
//             />
//         )}
//         </div>
//     );
//     }

// export default Cards;

import React, { useState, useEffect } from 'react';
import Custombtn from './Custombtn';
import Modal from './Modal';
import { collection, addDoc, getDocs, query } from "firebase/firestore"; 
import { toast } from "react-toastify";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';

function Cards({transactions,setTransactions,addTransaction
    ,balance,setBalance,balancea,setBalancea,income,expense,
    setIncome,setExpense
}) {
    const [activeModal, setActiveModal] = useState(null);
    const [nameState, setName] = useState("");
    const [amountState, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [opt, setOpt] = useState("");
    const [user] = useAuthState(auth);
 
   
    

    const option1 = ["abcd","efgh","ijkl"];
    // const option2 = ["Salary","Freelance","Investment"];
    const option2 = [
        "Salary",
        "Freelance",
        "Investments",
        "Business",
        "Rental Income",
        "Gifts",
        "Bonus",
        "Interest",
        "Royalties",
        "Others"
    ];
    const option3 = [
        "Food & Dining",
        "Education",
        "Office",
        "Transportation",
        "Healthcare",
        "Entertainment",
        "Shopping",
        "Utilities",
        "Travel",
        "Rent/Mortgage",
        "Insurance",
        "Miscellaneous"
    ];
    // const option3 = ["Food","Education","Office"];

    const openModal = (id) => setActiveModal(id);
    const closeModal = () => setActiveModal(null);

    useEffect(() => {
        if(user) fetchTransactions();
    }, [user]);

    useEffect(() => {
        calculateBalance();
    }, [transactions]);

    async function fetchTransactions() {
        if (!user) return;
        try {
            const q = query(collection(db, `users/${user.uid}/transactions`));
            const querySnapshot = await getDocs(q);
            const trans = [];
            querySnapshot.forEach(doc => trans.push(doc.data()));
            let trans2 = querySnapshot.docs.map((t,index)=>({
                s_no:index+1,
                id:t.id,
                key:t.key,
                ...t.data()
            }));
            setTransactions(trans);
        } catch(e) {
            // console.log(e.message);
            toast.error(e.message);
        }
    }

    function calculateBalance() {
        let totalIncome = 0;
        let totalExpense = 0;
        let runningBalance = 0;
        let balances = [];

        const parseDate = (d) => {
            if (!d) return new Date(0);
            if (d.includes('-') && d.split('-')[0].length !== 4) {
                const parts = d.split('-');
                return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            }
            return new Date(d);
        };

        const formatDate = (dateObj) => {
            if (isNaN(dateObj)) return "Invalid Date";
            const yyyy = dateObj.getFullYear();
            const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
            const dd = String(dateObj.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        let sorted = [...transactions].sort((a,b) => parseDate(a.date) - parseDate(b.date));

        sorted.forEach(t => {
            if(t.type === "income"){
                totalIncome += Number(t.amount);
                runningBalance += Number(t.amount);
            }
            else if(t.type === "expense"){ 
                totalExpense += Number(t.amount);
                runningBalance -= Number(t.amount);
            }
            
            const parsedDateObj = parseDate(t.date);
            const standardDate = formatDate(parsedDateObj);

            const existingDate = balances.find(b => b.date === standardDate);
            if (existingDate) {
                existingDate.amount = runningBalance;
            } else {
                balances.push({
                    date: standardDate,
                    amount: runningBalance,
                });
            }
        });

        setIncome(totalIncome);
        setExpense(totalExpense);
        setBalance(totalIncome-totalExpense);
        setBalancea(balances);
    }

    function showModals() {
        const newTransaction = {
            type: activeModal === "modal2" ? "income" : "expense",
            name: nameState,
            amount: Number(amountState),
            date: date,
            tag: opt
        };

        // Update UI immediately
        setTransactions(prev => [...prev, newTransaction]);

        // Add to Firestore
        addTransaction(newTransaction);

        // Reset modal fields
        setName(""); setAmount(""); setDate(""); setOpt("");
        closeModal();
    }

    // async function addTransaction(transaction) {
    //     if(!user) {
    //         toast.error("No active user. Please log in.");
    //         return;
    //     }
    //     try {
    //         await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
    //         toast.success("Transaction added");
    //     } catch(e) {
    //         toast.error(e.message);
    //     }
    // }

    return (
        <div className="cards">
            <div className="card" onClick={() => openModal("modal1")}>
                <p>Current Balance</p>
                <p>${balance}</p>
                <Custombtn disabled={true} btncontent="Reset Balance" blue={true} />
            </div>

            <div className="card" onClick={() => openModal("modal2")}>
                <p>Total Income</p>
                <p>${income}</p>
                <Custombtn btncontent="Add Income" blue={true} />
            </div>

            <div className="card" onClick={() => openModal("modal3")}>
                <p>Total Expenses</p>
                <p>${expense}</p>
                <Custombtn btncontent="Add Expense" blue={true} />
            </div>

            {activeModal && (
                <Modal
                    modalid={activeModal}
                    title={activeModal === "modal1" ? "Reset Balance" : activeModal === "modal2" ? "Add Income" : "Add Expense"}
                    closeModal={closeModal}
                    options={activeModal === "modal1" ? option1 : activeModal === "modal2" ? option2 : option3}
                    nameState={nameState} setName={setName}
                    amountState={amountState} setAmount={setAmount}
                    date={date} setDate={setDate}
                    opt={opt} setOpt={setOpt}
                    showmodals={showModals}
                />
            )}
        </div>
    );
}

export default Cards;


