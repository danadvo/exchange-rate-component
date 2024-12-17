import React, { useMemo } from 'react';
import './DateSelection.css';
import { formatDate } from '../utils';

const DateSelection = ({ dateRange, setDateRange }) => {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setDateRange(prev => {
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + 14);
      return {
        ...prev,
        from: newStartDate,
        to: newEndDate <= new Date() ? formatDate(newEndDate) : prev.to,
      };
    });
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setDateRange(prev => {
      if (new Date(newEndDate) <= new Date(prev.from)) {
        return prev;
      }
      return { ...prev, to: newEndDate };
    });
  };

  const maxEndDate = useMemo(()=>{
    if (!dateRange.from) return dateRange.today;
  
    const startDate = new Date(dateRange.from);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 14);
  
    return formatDate(endDate);
  },[dateRange.from])

  const minEndDate = useMemo(()=>formatDate(dateRange.from)??undefined , [dateRange.to]);

  return (
    <div className="date-selection-container">
      <div className="date-input-wrapper">
        <label className="date-label">Start Date:</label>
        <input
          type="date"
          value={dateRange.from || ''}
          onChange={handleStartDateChange}
          max={dateRange.today}
          className="date-input"
        />
      </div>
      <div className="date-input-wrapper">
        <label className="date-label">End Date:</label>
        <input
          type="date"
          value={dateRange.to || ''}
          onChange={handleEndDateChange}
          min={minEndDate}
          max={maxEndDate}
          className="date-input"
        />
      </div>
    </div>
  );
};

export default DateSelection;
