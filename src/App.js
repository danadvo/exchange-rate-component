 import { useState } from 'react';
import './App.css';
import {useHistoricalExchangeRates} from './routes.js';
import ExchangeRateGraph from './ExchangeRateGraph/ExchangeRateGraph.js';
import { formatDate, getDaysBetweenDates } from './utils.js';
import DateSelection from './DateSelection/DateSelection.js'

function App() {
  const today = new Date();
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);
  const [dateRange, setDateRange] = useState({
    from: formatDate(twoWeeksAgo),
    to: formatDate(today),
    today: formatDate(today),
  });
  const { data, isLoading, isError, error } = useHistoricalExchangeRates(dateRange.from ,getDaysBetweenDates(dateRange.from, dateRange.to));

  return (
    <div className="App">
      <h1>USD to ILS Exchange Rates</h1>
      <DateSelection dateRange={dateRange} setDateRange={setDateRange}/>
      {isLoading? 
      <div>Is Loading...</div> : 
      isError? <div>Something went wrong : `${error}`</div>: 
      <ExchangeRateGraph data={data} />
    }
    </div>
  );
}

export default App;
