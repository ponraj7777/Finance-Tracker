import React, { useEffect } from 'react'
import {Table} from 'antd'
import {useState} from 'react';
import Custominput from './Custominput';
import Statssearch from './Statssearch';
import Custommodalinput from './Custommodalinput';
import Statefilter from './Statefilter';
import Custombtn from './Custombtn';
import { toast } from 'react-toastify';
import { unparse,parse } from "papaparse";

function Stats({transactions,setTransactions,addTransaction}) {
    console.log("->",transactions);
    const [loading,setLoading] = useState(true);
    const [search,setSearch] = useState("");
    const [filterdrop,setFilterdrop] = useState("");
    const [activebtn,setActivebtn] = useState("No Sort");
    const [filtered,setFiltered] = useState(transactions);
    useEffect(()=>{
      const timer = setTimeout(()=>{
        setLoading(false);
      },2000)
    },[]);



    useEffect(() => {
      let filteredData =
        filterdrop === "All" || filterdrop === ""
          ? transactions.filter((t) =>
              (t.name || "").toLowerCase().includes(search.toLowerCase())
            )
          : transactions.filter(
              (t) =>
                (t.name || "").toLowerCase().includes(search.toLowerCase()) &&
                (t.type || "").toLowerCase() === filterdrop.toLowerCase()
            );

      const withid = filteredData.map((t, index) => ({
        sno: index + 1,
        key: index,
        ...t,
      }));

      setFiltered(withid);
    }, [transactions, search, filterdrop]);
    const columns = [
      { 
        title:'S.No',
        dataIndex:'sno',
        key:'sno'

      },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Tag',
        dataIndex: 'tag',
        key: 'tag',
    },
    
    ];
    let dataSource;
    if(loading){
      return <p>Loading...</p>
    }
    
    
 

  
  let options = ["All","Income","Expense"];
  const sortbtns = ["No Sort","Sort by Date","Sort by Amount"];
  function handleSort(type){
    setActivebtn(type);
    
    console.log("inside handleSort");
    
    
    let sorted = [...filtered];
    if(type === "Sort by Date"){
      
      sorted.sort((a,b)=>new Date(a.date)-new Date(b.date));
    }
    else if(type === "Sort by Amount"){
      sorted.sort((a,b)=>a.amount - b.amount);
    }
    else{
      sorted.sort((a,b)=>a.sno-b.sno);
    }
    console.log("filtered---",sorted);
    setFiltered(sorted);
  }
  function exportCSV(){
    toast.success("Exported");
      const csv = unparse(transactions, {
    fields: ["name", "type", "date", "amount", "tag"]  
   });

    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }





  function importCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      console.log("Results>>>", results.data);

      for (const row of results.data) {
        if (!row.name || !row.amount) continue; // skip bad rows

        const newTransaction = {
          name: row.name,
          type: row.type,
          date: row.date,
          tag: row.tag,
          amount: parseFloat(row.amount) || 0
        };

        try {
          await addTransaction(newTransaction,true); // Firestore
          console.log(newTransaction);
          
          setTransactions(prev => [...prev, newTransaction]); // update UI immediately
        } catch (e) {
          toast.error("Error importing row: " + e.message);
        }
      }
      toast.success("CSV imported successfully!");
    }
  });


  event.target.value = "";
}


  return (
    
    <div className="stat">
      <div className="searchbar">
        <Statssearch type = "text" state = {search} setState = {setSearch} placeholder = "Search"/>
        <Statefilter state={filterdrop} setState={setFilterdrop}
        options={options}/>
      </div>
      <div className="sortc">
        <h1 className='title'>My Transactions</h1>
        <div className="sbtns">
          {
            sortbtns.map((label)=>{
              return (
                
              <button 
              onClick={()=>handleSort(label)}
              key={label}
              className={`${(activebtn == label)?'active':''}`}
              >
                {label}
              </button>)
              
            })
          }
        </div>
        <div className="eibtns">
          <Custombtn btncontent="Export to CSV" blue={false} onClick={()=>exportCSV()}/>
          <label className="btn blue import" htmlFor="file-csv">Import from CSV</label>
          <input id="file-csv" type="file" accept=".csv" required onChange={(e)=>importCSV(e)}
          style={{display:"none"}}/>
          
        </div>
      </div>
     <Table className="statstable" dataSource={filtered} columns={columns} />
    </div>
  )

}

export default Stats;