export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2); 
    return `${day}/${month}/${year}`;
  };

export const customLegend = (v) => v === 'ILS'? 'ILS' : v === "percentChange" ? "% Change" : undefined;

const tooltipStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
    border: '1px solid #ddd',
    width: '200px',
    lineHeight: '1.6',
};

const tooltipItemStyle = {
    marginBottom: '5px',
};

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={tooltipStyle}>
          <div style={{ ...tooltipItemStyle, fontWeight: 'bold' }}>{label}</div>
          <div style={tooltipItemStyle}>
            <span style={{ color: '#8884d8' }}>Exchange Rate (ILS): </span>
            {data.ILS}
          </div>
          <div style={tooltipItemStyle}>
            <span style={{ color: '#82ca9d' }}>% Change: </span>
            {data.percentChange.toFixed(2)}%
          </div>
        </div>
      );
    }
    return null;
};
