import React from 'react';
import './ExchangeRateGraph.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatDate, CustomTooltip, customLegend } from './utils';

const ExchangeRateGraph = ({ data }) => {
  const formattedData = data.map((day) => ({
    date: formatDate(day.timestamp), 
    ILS: day.rates?.ILS || 0, 
  }));

  const calcPercentageChange = (data) => {
    return data.map((day, index) => {
      if (index === 0) {
        return { ...day, percentChange: 0 };
      }
      const previousRate = data[index - 1].ILS;
      const currentRate = day.ILS;
  
      const percentChange = ((currentRate - previousRate) / previousRate) * 100;
  
      return { ...day, percentChange };
    });
  };

  const dataWithPercentageChange = calcPercentageChange(formattedData);

  return (
    <div className="exchange-rate-graph">
        <ResponsiveContainer width="100%" height="100%" >
        <LineChart 
            data={dataWithPercentageChange}   
            margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
        >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={customLegend}/>
            <Line type="monotone" dataKey="ILS" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="percentChange" label="% Change" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ExchangeRateGraph;
