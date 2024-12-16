import React from 'react';
import './DateSelection.css';
import {formatDate} from '../utils';

const DateSelection = ({ dateRange, setDateRange }) => {
    return (
    <div className="date-selection-container">
        <div className="date-input-wrapper">
            <label className="date-label">Start Date:</label>
            <input
            type="date"
            value={dateRange.from || null}
            onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            max={dateRange.today}
            className="date-input"
            />
        </div>
        <div className="date-input-wrapper">
            <label className="date-label">End Date:</label>
            <input
            type="date"
            value={dateRange.to || null}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            max={(() => {
                if (dateRange.from){
                    const maxDate = new Date(dateRange.from);
                    maxDate.setDate(maxDate.getDate() + 14);
                    const minDate = dateRange.today < maxDate ? dateRange.today : maxDate;
                    return formatDate(minDate);
                }
              })()}
            className="date-input"
            />
        </div>
    </div>)
}

export default DateSelection;