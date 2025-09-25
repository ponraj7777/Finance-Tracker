
import { Line } from '@ant-design/plots';
import {useState,useEffect} from 'react'
function Linechart({balancea}) {
    const [data,setDate] = useState([]);
   useEffect(()=>{
    setDate(balancea);
    console.log("balacneeeee",balancea);
    
   },[balancea])

  const config = {
    data,
    xField: 'date',
    yField: 'amount',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
 
     return (

    <div className="parent">
     <Line {...config} className="linechart" />
    </div>)
     
  
}

export default Linechart