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
    setDateRange(prev => ({ ...prev, to: newEndDate }));
  };

  const maxEndDate = useMemo(()=>{
    const today = new Date(dateRange.today);
    let limitedEndDate = today;
    if (dateRange.from){  
      const startDate = new Date(dateRange.from);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 14);
      limitedEndDate = endDate > today ? today : endDate;
    }
    return formatDate(limitedEndDate);
  },[dateRange.from])

  const minEndDate = useMemo(()=> formatDate(dateRange.from) ?? undefined , [dateRange.from]);

  return (
    <div className="date-selection-container">
      <div className="date-input-container">
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
      <p>Selecting a start date will automatically set the end date to two weeks later. You can adjust the end date manually if needed.</p>
    </div>
  );
};

export default DateSelection;
