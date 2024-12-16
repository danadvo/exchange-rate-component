This project implements an Exchange Rate Component that displays historical exchange rates between USD and ILS for the past two weeks. 
The data is presented in a diagram (line chart), where users can see the daily exchange rate over the specified date range.

Key Features:
- Displays daily exchange rates: Shows the exchange rate between USD and ILS for the past 2 weeks.
- Visual representation: Utilizes a line chart to represent the daily exchange rate.
- Date selection: Allows users to select a date range (up to 2 weeks at a time).
- Cache API requests: Caches API responses between date changes to avoid unnecessary re-fetching.
- Displays exchange rate differences: Shows the percentage change between consecutive days, presented as an additional line on the chart.
- Date range limitation: Restricts the date range to a maximum of 14 days, preventing the user from selecting longer date ranges.

Getting Started
To get the project up and running locally, follow these steps:

1. Clone the Repository
    git clone https://github.com/danadvo/exchange-rate-component.git
    cd exchange-rate-component
2. Install Dependencies
    npm install
3. Start the Application
    npm start

This will start the development server, and you can view the project in your browser at http://localhost:3000.