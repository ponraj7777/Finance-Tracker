import { Pie } from '@ant-design/plots';
import React from 'react';
import { createRoot } from 'react-dom';

const Dompie = ({income,expense,balance}) => {
  const config = {
    data: [
      { type: 'Income', value: income },
      { type: 'Expense', value: expense },
      { type: 'Balance', value: balance }
  
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return(<div className='piechart'>
  <Pie className="pie" {...config} /></div>)
};

export default Dompie;